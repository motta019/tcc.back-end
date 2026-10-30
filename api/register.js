const {
  cleanText, createSession, emailKey, endpoint, getBody, getRedis,
  hashPassword, json, rateLimit, validEmail
} = require('../lib/api');

module.exports = endpoint('POST', async (req, res) => {
  if (!await rateLimit(req, res, 'register', 5, 60 * 60)) return;
  const body = getBody(req);
  const rawName = typeof body.name === 'string' ? body.name : '';
  const rawEmail = typeof body.email === 'string' ? body.email : '';
  const name = cleanText(rawName, 100);
  const email = cleanText(rawEmail, 254).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';

  if (rawName.trim().length < 2 || rawName.trim().length > 100) {
    return json(res, 400, { error: 'Informe um nome entre 2 e 100 caracteres.' });
  }
  if (rawEmail.length > 254 || !validEmail(email)) return json(res, 400, { error: 'Informe um e-mail válido.' });
  if (password.length < 6 || password.length > 200) {
    return json(res, 400, { error: 'A senha deve ter entre 6 e 200 caracteres.' });
  }

  const redis = getRedis();
  const user = { name, passHash: hashPassword(password), createdAt: new Date().toISOString() };
  const created = await redis.set(emailKey(email), JSON.stringify(user), { nx: true });
  if (!created) return json(res, 409, { error: 'Este e-mail já possui cadastro. Use a aba Entrar.' });

  await createSession(res, email, body.remember === true);
  return json(res, 201, { name, email });
});
