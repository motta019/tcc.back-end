const crypto = require('crypto');
const {
  cleanText, emailKey, endpoint, getBody, getRedis, getResend,
  json, rateLimit, validEmail
} = require('../lib/api');

module.exports = endpoint('POST', async (req, res) => {
  if (!await rateLimit(req, res, 'forgot', 5, 60 * 60)) return;
  const input = getBody(req).email;
  const email = typeof input === 'string' && input.length <= 254
    ? cleanText(input, 254).toLowerCase()
    : '';

  if (validEmail(email)) {
    const redis = getRedis();
    const stored = await redis.get(emailKey(email));
    if (stored) {
      const token = crypto.randomBytes(32).toString('hex');
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
      const resetKey = `reset:${tokenHash}`;
      try {
        await redis.set(resetKey, email, { ex: 60 * 60 });
        const siteUrl = (process.env.SITE_URL || '').replace(/\/+$/, '');
        const from = process.env.MAIL_FROM;
        if (!siteUrl || !from) throw new Error('SITE_URL e MAIL_FROM precisam estar configurados.');
        const resetUrl = `${siteUrl}/?reset=${encodeURIComponent(token)}`;
        const result = await getResend().emails.send({
          from,
          to: email,
          subject: 'Redefinição de senha Andermaq',
          html: `<p>Recebemos uma solicitação para redefinir sua senha.</p><p><a href="${resetUrl}">Definir nova senha</a></p><p>O link expira em 1 hora. Se você não solicitou a redefinição, ignore esta mensagem.</p>`,
          text: `Recebemos uma solicitação para redefinir sua senha. Acesse ${resetUrl}. O link expira em 1 hora. Se você não solicitou a redefinição, ignore esta mensagem.`
        });
        if (!result || result.error || !result.data || !result.data.id) {
          console.error('Resend reset email failed:', result && result.error ? result.error : 'Resend did not confirm delivery.');
          try {
            await redis.del(resetKey);
          } catch (cleanupError) {
            console.error('Reset token cleanup failed:', cleanupError);
          }
        }
      } catch (error) {
        console.error('Resend reset email failed:', error);
        try {
          await redis.del(resetKey);
        } catch (cleanupError) {
          console.error('Reset token cleanup failed:', cleanupError);
        }
      }
    }
  }

  return json(res, 200, { ok: true });
});
