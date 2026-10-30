const {
  createSession, emailKey, endpoint, getBody, getRedis, json,
  passwordMatches, rateLimit, validEmail
} = require('../lib/api');

module.exports = endpoint('POST', async (req, res) => {
  if (!await rateLimit(req, res, 'login', 10, 15 * 60)) return;
  const body = getBody(req);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const redis = getRedis();
  const stored = validEmail(email) && password.length <= 200
    ? await redis.get(emailKey(email))
    : null;
  const user = typeof stored === 'string' ? JSON.parse(stored) : stored;
  const matches = passwordMatches(password.slice(0, 200), user && user.passHash);

  if (!validEmail(email) || password.length > 200 || !user || !matches) {
    return json(res, 401, { error: 'E-mail ou senha incorretos.' });
  }

  await createSession(res, email, body.remember === true);
  return json(res, 200, { name: user.name, email });
});
