
const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();
const nodemailer = require("nodemailer");
const db = require('./database');

const app = express();

const transporte = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_REMETENTE,
        pass: process.env.SENHA_APP
    }
});

const frontend = path.join(__dirname, "../front");

// Receber dados do formulário
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão
app.use(session({
    secret: process.env.SESSION_SECRET || "chave_de_teste_velocity",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        sameSite: "lax"
    }
}));

app.post("/solicitar-codigo", async (req, res) => {

    const { email } = req.body;

    if (!email || !email.includes("@")) {
        return res.status(400).send("E-mail inválido!");
    }

    // Gera código de 4 dígitos
    const codigo = Math.floor(1000 + Math.random() * 9000);

    try {
        await transporte.sendMail({
            from: process.env.EMAIL_REMETENTE,
            to: email,
            subject: "Código de acesso - Velocity Motorsport",
            text: `Seu código de confirmação é: ${codigo}`
        });

        // Guarda os dados na sessão
        req.session.codigo = String(codigo);
        req.session.emailPendente = email;

        res.redirect("/confirmar");

    } catch (erro) {
        console.log(erro.message);
        res.status(500).send("Erro ao enviar o código!");
    }
});

// Arquivos públicos
app.use("/assets", express.static(path.join(frontend, "assets")));

app.get("/colorir.css", (req, res) => {
    res.sendFile(path.join(frontend, "colorir.css"));
});

app.get("/script.js", (req, res) => {
    res.sendFile(path.join(frontend, "script.js"));
});

// Página inicial
app.get("/", (req, res) => {
    res.redirect("/login");
});

// Página de login
app.get("/login", (req, res) => {
    res.sendFile(path.join(frontend, "index.html"));
});



// Página de confirmação
app.get("/confirmar", (req, res) => {
    res.sendFile(path.join(frontend, "confirmar.html"));
});

app.post("/confirmar", (req, res) => {

    const { codigo } = req.body;

    // Verifica se existe código na sessão
    if (!req.session.codigo || !req.session.emailPendente) {
        return res.redirect("/login");
    }

    // Verifica se o código está correto
    if (codigo === req.session.codigo) {

        req.session.usuario = req.session.emailPendente;
        req.session.tipo =
            req.session.usuario === process.env.EMAIL_ADMIN
                ? "admin"
                : "cliente";

        delete req.session.codigo;
        delete req.session.emailPendente;

        res.redirect("/dashboard");

    } else {

        delete req.session.codigo;
        delete req.session.emailPendente;

        res.redirect("/login?erro=1");
    }

});

// Middleware de proteção
function verificaAcesso(req, res, next) {
    if (req.session.usuario) {
        next();
    } else {
        res.redirect("/login");
    }
}


 // Login rápido de ADMIN para testes locais
app.get("/admin", (req, res) => {
    const ip = req.socket.remoteAddress;

    const acessoLocal = [
        "127.0.0.1",
        "::1",
        "::ffff:127.0.0.1"
    ].includes(ip);

    if (
        process.env.NODE_ENV === "production" ||
        process.env.ACESSO_ADMIN_TESTE !== "true" ||
        !acessoLocal
    ) {
        return res.status(403).send("Acesso não permitido!");
    }

    req.session.regenerate((erro) => {
        if (erro) {
            return res.status(500).send("Erro ao iniciar sessão!");
        }

        req.session.usuario = "admin@teste.local";
        req.session.tipo = "admin";

        req.session.save((erro) => {
            if (erro) {
                return res.status(500).send("Erro ao salvar sessão!");
            }

            res.redirect("/dashboard");
        });
    });
});

// Dashboard protegido
app.get("/dashboard", verificaAcesso, (req, res) => {
    res.sendFile(path.join(frontend, "dashboard.html"));
});

app.get("/dashboard.html", verificaAcesso, (req, res) => {
    res.redirect("/dashboard");
});

// Retorna o usuário logado
app.get("/usuario", (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ erro: "Sessão expirada" });
    }

    res.json({
        usuario: req.session.usuario,
        tipo: req.session.tipo
    });
});

 // Buscar todos os carros do banco de dados
app.get("/carros", verificaAcesso, (req, res) => {
    db.all("SELECT * FROM carros", [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                erro: "Erro ao buscar carros"
            });
        }

        res.json(rows);
    });
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/login");
});
