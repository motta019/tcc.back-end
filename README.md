# Andermaq — deploy na Vercel

O site é estático na raiz do repositório (`index.html` e `img/`) e usa Vercel Functions em `api/` para cadastro, login, sessão, redefinição de senha e envio de cotações. Não há etapa de build: **não configure build command nem execute `build_site.js`**. O `server.js` permanece apenas como servidor estático de desenvolvimento antigo; use `vercel dev` para testar também as APIs.

## Pré-requisitos

- Conta na Vercel e repositório conectado ao projeto.
- Banco Redis criado pelo marketplace da Vercel com Upstash.
- Conta no Resend e um domínio verificado para envio de e-mails.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` no desenvolvimento local. Configure as mesmas variáveis em **Vercel → Project → Settings → Environment Variables** para Development, Preview e Production conforme necessário:

| Variável | Uso |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` | URL REST do Upstash Redis |
| `UPSTASH_REDIS_REST_TOKEN` | Token REST do Upstash Redis |
| `RESEND_API_KEY` | Chave de API do Resend |
| `MAIL_TO` | Destinatário das cotações (`anderson@andermaqmangueiras.com`) |
| `MAIL_FROM` | Remetente em domínio verificado, por exemplo `Andermaq <contato@andermaqmangueiras.com>` |
| `SITE_URL` | URL pública do site, sem barra final, por exemplo `https://www.andermaqmangueiras.com` |

Ao conectar o Upstash pelo Marketplace, a Vercel pode fornecer `KV_REST_API_URL` e `KV_REST_API_TOKEN`; as funções aceitam esses nomes como alternativa aos nomes `UPSTASH_*`.

No Resend, adicione e verifique o domínio de envio e publique os registros DNS solicitados antes de usar um remetente desse domínio. **Sem domínio verificado, o Resend só permite enviar para o e-mail dono da conta**, o que impede o envio de cotações para o cliente e a entrega normal das mensagens operacionais.

## Deploy

1. Importe este repositório em **Vercel → Add New → Project** e selecione o projeto.
2. Deixe o Framework Preset como `Other`, a raiz do projeto como a raiz do repositório e os comandos de build/desenvolvimento em branco. A Vercel publica diretamente o `index.html` e detecta as funções em `api/`.
3. Em **Storage/Marketplace**, crie ou conecte uma instância Upstash Redis ao projeto. Confirme que as variáveis REST do Upstash foram adicionadas ao projeto.
4. Configure `RESEND_API_KEY`, `MAIL_TO`, `MAIL_FROM` e `SITE_URL` conforme a tabela. `MAIL_FROM` deve pertencer ao domínio verificado no Resend e `SITE_URL` deve corresponder ao domínio que será publicado.
5. Faça o deploy. Para domínio próprio, adicione-o ao projeto e atualize `SITE_URL` para a URL final; depois faça novo deploy.
6. No painel da Vercel, confira os logs das Functions `/api/*` e teste o cadastro, o login, o e-mail de redefinição e uma cotação.

## Desenvolvimento local

Instale as dependências e o CLI da Vercel, configure `.env.local` e execute:

```sh
npm install
npx vercel dev
```

O servidor antigo `node server.js` publica apenas arquivos estáticos e **não** executa as funções de autenticação ou e-mail. As funções exigem conexão com Upstash e Resend para testar os fluxos completos. Nunca exponha `.env.local` nem coloque credenciais no HTML.

## Contas existentes

Contas e históricos que estavam em `localStorage` não são migrados para o Redis. Os clientes precisarão criar uma nova conta no sistema publicado.
