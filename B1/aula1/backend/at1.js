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
    <a href="/aluno/:Nome/:">Ir para aluno</a><br>
    <a href="/aluno/status">Ir para status</a><br>
    <h2>Caso deseje fazer calculos, basta clica no link abaixo e acrescentar
    o primeiro número e o segundo no link N1/N2<br></h2>
    <a href="/aluno/:Nome/:soma">Ir para soma</a><br>
    <a href="/aluno/:Nome/:sub">Ir para subtração</a><br>
    <a href="/aluno/:Nome/:multi">Ir para multiplicação</a>`
    )
})


app.get("/status", (req, res) => {//att
    res.json({
        servidor: "Oniline",
        disciplina: "CPW3",
        professora: "Milena",
        hora: new Date().toLocaleDateString()
    })
})



app.get("/soma/:a/:b", (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const resultado = a + b;

    res.send(`O resultado é:, ${resultado}:`)
})


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
})