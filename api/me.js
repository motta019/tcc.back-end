const { endpoint, getRedis, getSession, json } = require('../lib/api');

module.exports = endpoint('GET', async (req, res) => {
  const session = await getSession(req);
  if (!session) return json(res, 401, { error: 'Sessão não encontrada.' });

  const redis = getRedis();
  const stored = await redis.get(`user:${session.email}`);
  const user = typeof stored === 'string' ? JSON.parse(stored) : stored;
  if (!user || typeof user.name !== 'string') return json(res, 401, { error: 'Sessão não encontrada.' });

  const quotes = await redis.lrange(`quotes:${session.email}`, 0, 7);
  return json(res, 200, {
    name: user.name,
    email: session.email,
    quotes: quotes.map(quote => typeof quote === 'string' ? JSON.parse(quote) : quote)
  });
});
