const crypto = require('crypto');
const {
  endpoint, getBody, getRedis, hashPassword, json, rateLimit
} = require('../lib/api');

module.exports = endpoint('POST', async (req, res) => {
  if (!await rateLimit(req, res, 'reset', 10, 15 * 60)) return;
  const body = getBody(req);
  const token = typeof body.token === 'string' ? body.token : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (password.length < 6 || password.length > 200) {
    return json(res, 400, { error: 'A senha deve ter entre 6 e 200 caracteres.' });
  }
  if (!/^[a-f0-9]{64}$/i.test(token)) return json(res, 400, { error: 'Link de redefinição inválido ou expirado.' });

  const redis = getRedis();
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const email = await redis.getdel(`reset:${tokenHash}`);
  if (!email) return json(res, 400, { error: 'Link de redefinição inválido ou expirado.' });

  const key = `user:${email}`;
  const stored = await redis.get(key);
  const user = typeof stored === 'string' ? JSON.parse(stored) : stored;
  if (!user || typeof user.name !== 'string') return json(res, 400, { error: 'Link de redefinição inválido ou expirado.' });

  user.passHash = hashPassword(password);
  await redis.set(key, JSON.stringify(user));
  const sessionSet = `user-sessions:${email}`;
  const sessions = await redis.smembers(sessionSet);
  if (sessions.length) await redis.del(...sessions.map(session => `session:${session}`));
  await redis.del(sessionSet);
  return json(res, 200, { ok: true });
});
