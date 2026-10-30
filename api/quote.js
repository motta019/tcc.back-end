const {
  cleanText, endpoint, getBody, getRedis, getResend, getSession, json,
  rateLimit, requiredMailConfig, validEmail, escapeHtml
} = require('../lib/api');

module.exports = endpoint('POST', async (req, res) => {
  if (!await rateLimit(req, res, 'quote', 5, 10 * 60)) return;
  const body = getBody(req);

  if (cleanText(body.website, 200)) return json(res, 200, { ok: true, quotes: null });

  const rawName = typeof body.nome === 'string' ? body.nome : '';
  const rawEmail = typeof body.email === 'string' ? body.email : '';
  const rawTel = typeof body.tel === 'string' ? body.tel : '';
  const rawCategory = typeof body.categoria === 'string' ? body.categoria : '';
  const name = cleanText(rawName, 100);
  const email = cleanText(rawEmail, 254).toLowerCase();
  const tel = cleanText(rawTel, 40);
  const category = cleanText(rawCategory, 100);
  const quantity = cleanText(String(body.qtd == null ? '' : body.qtd), 8);
  const description = cleanText(body.descricao, 500);
  const items = cleanText(body.itens, 2000);

  if (rawName.trim().length < 2 || rawName.trim().length > 100) {
    return json(res, 400, { error: 'Informe um nome entre 2 e 100 caracteres.' });
  }
  if (rawEmail.length > 254 || !validEmail(email)) return json(res, 400, { error: 'Informe um e-mail válido.' });
  if (rawTel.length > 40 || (tel && tel.replace(/\D/g, '').length < 10)) {
    return json(res, 400, { error: 'Informe um telefone com DDD válido.' });
  }
  if (rawCategory.trim().length < 2 || rawCategory.trim().length > 100 ||
      !/^[\p{L}\p{N} .,'()/+-]{2,100}$/u.test(category)) {
    return json(res, 400, { error: 'Informe uma categoria válida.' });
  }
  if (String(body.qtd == null ? '' : body.qtd).length > 8 ||
      !/^\d{1,6}$/.test(quantity) || Number(quantity) < 1) {
    return json(res, 400, { error: 'Informe uma quantidade válida.' });
  }
  if (typeof body.descricao !== 'string' || body.descricao.length > 500) {
    return json(res, 400, { error: 'A descrição deve ter no máximo 500 caracteres.' });
  }
  if (typeof body.itens !== 'string' || body.itens.length > 2000) {
    return json(res, 400, { error: 'A lista de itens excede o limite permitido.' });
  }

  const fields = [
    ['Nome / Razão', name],
    ['E-mail', email],
    ['Telefone / WhatsApp', tel || 'Não informado'],
    ['Linha principal', category],
    ['Quantidade estimada', quantity],
    ['Detalhes da cotação', description || 'Conforme especificado no catálogo'],
    ['Itens do catálogo', items || 'Nenhum item adicional selecionado no carrinho']
  ];
  const text = fields.map(([label, value]) => `${label}: ${value}`).join('\n');
  const html = `<table>${fields.map(([label, value]) =>
    `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`
  ).join('')}</table>`;

  try {
    const { to, from } = requiredMailConfig();
    const result = await getResend().emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nova Cotação Andermaq - ${category}`,
      html,
      text
    });
    if (!result || result.error || !result.data || !result.data.id) {
      console.error('Resend quote email failed:', result && result.error ? result.error : 'Resend did not confirm delivery.');
      return json(res, 502, { error: 'Não foi possível enviar a cotação por e-mail. Tente novamente ou use WhatsApp/e-mail.' });
    }
  } catch (error) {
    console.error('Resend quote email failed:', error);
    return json(res, 502, { error: 'Não foi possível enviar a cotação por e-mail. Tente novamente ou use WhatsApp/e-mail.' });
  }

  let quotes = null;
  let historySaved = null;
  try {
    const session = await getSession(req);
    if (session) {
      const redis = getRedis();
      const now = new Date();
      const quote = {
        d: now.toLocaleDateString('pt-BR'),
        t: `${category} · ${quantity} unidade(s)${items ? ` · ${items}` : ''}`.slice(0, 180)
      };
      await redis.lpush(`quotes:${session.email}`, JSON.stringify(quote));
      await redis.ltrim(`quotes:${session.email}`, 0, 7);
      quotes = await redis.lrange(`quotes:${session.email}`, 0, 7);
      quotes = quotes.map(item => typeof item === 'string' ? JSON.parse(item) : item);
      historySaved = true;
    }
  } catch (error) {
    console.error('Quote history could not be saved:', error);
    historySaved = false;
  }

  return json(res, 200, { ok: true, quotes, historySaved });
});
