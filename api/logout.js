const {
  clearSessionCookie, endpoint, getRedis, getSession, json
} = require('../lib/api');

module.exports = endpoint('POST', async (req, res) => {
  const session = await getSession(req);
  if (session) {
    const redis = getRedis();
    await redis.del(`session:${session.token}`);
    await redis.srem(`user-sessions:${session.email}`, session.token);
  }
  clearSessionCookie(res);
  return json(res, 200, { ok: true });
});
