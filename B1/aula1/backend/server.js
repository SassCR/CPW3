const express = require("express");
const app = express();

app.use((req, res, next) => {//att
    console.log("Acesso", req.method, req.url);
    next();
});

//1. Define uma nota (endpoint)
app.get("/", (req, res) => {
    res.send("Bom dia");
});

//2. Liga o servidor para abrir na porta 3000 ou a que decidir
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
})

app.get("/aluno/:nome", (req, res) => {
    const nome = req.params.nome;
    res.send(`Bom dia, ${nome}:`)
})

app.get("/aluno/:nome/:a/:b", (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const resultado = a + b;

    res.send(`Bom dia, ${resultado}:`)
})




app.get("/status", (req, res) => {//att
    res.json({
        servidor: "Oniline",
        disciplina: "CPW3",
        professora: "Milena",
        hora: new Date().toLocaleDateString()
    })
})

//rota GET principal
app.get("/menu", (req, res) => {
    res.send(`
        <h1>Menu
        <a href="/aluno/Milena">Ir para aluno</a><br>
        <a href="/status">Ir paa status</a>`)
})