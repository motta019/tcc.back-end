const crypto = require('crypto');
const { Redis } = require('@upstash/redis');
const { Resend } = require('resend');

const SESSION_COOKIE = 'am_session';
const DAY = 60 * 60 * 24;
let redisClient;
let resendClient;

function json(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

function endpoint(method, handler) {
  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== method) {
      res.setHeader('Allow', method);
      return json(res, 405, { error: 'Método não permitido.' });
    }

    if (method === 'POST' && !isSameOrigin(req)) {
      return json(res, 403, { error: 'Origem da solicitação não permitida.' });
    }

    try {
      await handler(req, res);
    } catch (error) {
      if (error.statusCode === 400) {
        return json(res, 400, { error: error.message });
      }
      console.error(`API ${req.url} failed:`, error);
      if (!res.headersSent) json(res, 500, { error: 'Não foi possível concluir a solicitação. Tente novamente.' });
    }
  };
}

function isSameOrigin(req) {
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (!origin || !host) return false;

  try {
    return new URL(origin).host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}

function getRedis() {
  if (!redisClient) {
    if (!process.env.UPSTASH_REDIS_REST_URL && process.env.KV_REST_API_URL) {
      process.env.UPSTASH_REDIS_REST_URL = process.env.KV_REST_API_URL;
    }
    if (!process.env.UPSTASH_REDIS_REST_TOKEN && process.env.KV_REST_API_TOKEN) {
      process.env.UPSTASH_REDIS_REST_TOKEN = process.env.KV_REST_API_TOKEN;
    }
    redisClient = Redis.fromEnv();
  }
  return redisClient;
}

function getResend() {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY não configurada.');
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

function getBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body || '{}');
    } catch {
      const error = new Error('Corpo da solicitação inválido.');
      error.statusCode = 400;
      throw error;
    }
  }
  return {};
}

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function validEmail(value) {
  return typeof value === 'string' &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function emailKey(value) {
  return `user:${value.toLowerCase()}`;
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(password, salt, 64);
  return `${salt.toString('hex')}:${derived.toString('hex')}`;
}

function passwordMatches(password, storedHash) {
  const parts = typeof storedHash === 'string' ? storedHash.split(':') : [];
  if (parts.length !== 2 || !/^[a-f0-9]{32}$/i.test(parts[0]) || !/^[a-f0-9]{128}$/i.test(parts[1])) {
    const dummySalt = Buffer.alloc(16);
    const dummyHash = crypto.scryptSync(password, dummySalt, 64);
    crypto.timingSafeEqual(dummyHash, Buffer.alloc(64));
    return false;
  }
  const expected = Buffer.from(parts[1], 'hex');
  const actual = crypto.scryptSync(password, Buffer.from(parts[0], 'hex'), expected.length);
  return crypto.timingSafeEqual(actual, expected);
}

function cookieToken(req) {
  const cookies = (req.headers.cookie || '').split(';');
  const entry = cookies.map(item => item.trim()).find(item => item.startsWith(`${SESSION_COOKIE}=`));
  if (!entry) return '';
  try {
    return decodeURIComponent(entry.slice(SESSION_COOKIE.length + 1));
  } catch {
    return '';
  }
}

function setSessionCookie(res, token, maxAge) {
  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`
  );
}

function clearSessionCookie(res) {
  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
  );
}

async function getSession(req) {
  const token = cookieToken(req);
  if (!token || token.length > 128) return null;
  const redis = getRedis();
  const email = await redis.get(`session:${token}`);
  return email ? { token, email: String(email) } : null;
}

async function createSession(res, email, remember) {
  const redis = getRedis();
  const token = crypto.randomBytes(32).toString('hex');
  const maxAge = remember ? 30 * DAY : 12 * 60 * 60;
  await redis.set(`session:${token}`, email, { ex: maxAge });
  await redis.sadd(`user-sessions:${email}`, token);
  await redis.expire(`user-sessions:${email}`, 30 * DAY);
  setSessionCookie(res, token, maxAge);
}

function requestIp(req) {
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) return realIp.trim();
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) return forwarded.split(',')[0].trim();
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : 'unknown';
}

async function rateLimit(req, res, route, limit, seconds) {
  const key = `ratelimit:${route}:${encodeURIComponent(requestIp(req))}`;
  const redis = getRedis();
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, seconds);
  if (count > limit) {
    res.setHeader('Retry-After', String(seconds));
    json(res, 429, { error: 'Muitas tentativas. Aguarde antes de tentar novamente.' });
    return false;
  }
  return true;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
}

function requiredMailConfig() {
  const to = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM;
  if (!to || !from) throw new Error('MAIL_TO e MAIL_FROM precisam estar configurados.');
  return { to, from };
}

module.exports = {
  DAY,
  cleanText,
  cookieToken,
  createSession,
  emailKey,
  endpoint,
  escapeHtml,
  getBody,
  getRedis,
  getResend,
  getSession,
  hashPassword,
  isSameOrigin,
  json,
  passwordMatches,
  rateLimit,
  requiredMailConfig,
  setSessionCookie,
  clearSessionCookie,
  validEmail
};
