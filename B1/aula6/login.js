const express = require('express');
const session = require('express-session');

const app = express();

// ConfiguraÃ§Ã£o da SessÃ£o e do Cookie
app.use(session({
  secret: 'chave_secreta_e_segura_aqui',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,       // Impede acesso via JavaScript (XSS)
    secure: false,        // Mantenha 'false' no localhost; mude para 'true' em produÃ§Ã£o (HTTPS)
    sameSite: 'lax',      // Protege contra CSRF
    maxAge: 1000 * 60 * 15 // Expira em 15 minutos
  }
}));

// Rota 1: Simula o Login (Cria a sessÃ£o e envia o cookie ao navegador)
app.get('/login', (req, res) => {
  req.session.user = { id: 105, nome: 'Milena', role: 'admin' };
  res.send('Login realizado com sucesso! Cookie criado.');
});

// Rota 2: Acessa os dados salvos na sessÃ£o
app.get('/perfil', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Acesso negado. FaÃ§a login primeiro em /login');
  }
  res.send(`Bem-vinda, ${req.session.user.nome}! Seus dados estÃ£o salvos na sessÃ£o.`);
});

// Rota 3: Logout (DestrÃ³i a sessÃ£o e limpa o cookie)
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.send('SessÃ£o encerrada e cookie removido.');
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});