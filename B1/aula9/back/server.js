
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

const frontend = path.join(__dirname, "../front");

// Receber dados do formulário
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão
app.use(session({
    secret: process.env.SESSION_SECRET || "chave_de_teste_velocity",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
        httpOnly: true,
        sameSite: "lax"
    }
}));

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

// Verificação do login
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    // Administrador
    if (email === "admin" && senha === "admin") {
        req.session.usuario = "admin";
        req.session.tipo = "admin";

        return res.redirect("/dashboard");
    }

    // Cliente normal
    if (typeof email === "string" && typeof senha === "string" &&
        email.includes("@") && senha.length >= 6) {

        req.session.usuario = email;
        req.session.tipo = "cliente";

        return res.redirect("/dashboard");
    }

    res.redirect("/login?erro=1");
});

// Middleware de proteção
function verificaAcesso(req, res, next) {
    if (req.session.usuario) {
        next();
    } else {
        res.redirect("/login");
    }
}

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
