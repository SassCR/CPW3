const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Bem vindo!")
})

app.get("/aluno/:nome", (req, res) => {
    const nome = req.params.nome;
    res.send(`Bom dia, ${nome}!`)
})


app.get("/menu", (req, res) => {
    res.send(`
    <h1>Seja bem vindo ao menu!</h1><br>
    <a href="/aluno/Rene.">Ir para aluno</a><br>
    <a href="/status">Ir para status</a><br>
    <h2>Caso deseje fazer calculos, basta clica no link abaixo!<br></h2>
    <a href="/soma">Ir para soma</a><br>
    <a href="/sub">Ir para subtração</a><br>
    <a href="/multi">Ir para multiplicação</a>`
)
})

app.get("/soma/:a/:b", (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const resultado = a + b;

    res.send(`Bom dia, ${resultado}:`)
})


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
})