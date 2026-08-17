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
    
    
    <div id="Formulario" style="display: block;">
        <h1>Seja bem vindo ao menu!</h1>
        <label>Para da continuedade digite seu nome abaixo:</label><br>
        <input type="text" id="nome"><br>
        <button type="button" onclick="enviar()">Enviar</button>
    </div>

    <div id="Conteudo" style="display: none;">
        <h1 id="Bem vindo">Seja bem vindo ao menu! </h1><br>
        <a id="lnk_aluno" href="/aluno/:nome">Ir para aluno</a><br>
        <a href="/aluno/status">Ir para status</a><br>
        <h2>Caso deseje fazer calculos, basta clica no link abaixo e acrescentar o primeiro número e o segundo no link N1/N2<br></h2>
        <a id="lnk_soma" href="/aluno/:nome/:soma">Ir para soma</a><br>
        <a id="lnk_sub" href="/aluno/:nome/:sub">Ir para subtração</a><br>
        <a id="lnk_multi" href="/aluno/:nome/:multi">Ir para multiplicação</a>
    </div>
    
    <script>
    function enviar() {
        var nomeDigitado = document.getElementById('nome').value;
        document.getElementById('Bem vindo').innerText = "Seja bem vindo ao menu, " + nomeDigitado + "!";

        document.getElementById('lnk_aluno').href = "/aluno/" + nomeDigitado;
        document.getElementById('lnk_soma').href = "/aluno/" + nomeDigitado + "/soma";
        document.getElementById('lnk_sub').href = "/aluno/" + nomeDigitado + "/sub";
        document.getElementById('lnk_multi').href = "/aluno/" + nomeDigitado + "/multi";

        // Mostra o bloco com o resto do conteúdo
        document.getElementById('Conteudo').style.display = 'block';
        
        // Esconde o campo de texto e o botão de enviar
        document.getElementById('Formulario').style.display = 'none';
    }
    </script>
    `)
})


app.get("/status", (req, res) => {//att
    res.json({
        servidor: "Oniline",
        disciplina: "CPW3",
        professora: "Milena",
        hora: new Date().toLocaleDateString()
    })
})



app.get("/aluno/:nome/soma/:a/:b", (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const resultado = a + b;

    res.send(`O resultado da soma é: ${resultado}:`)
})

app.get("/aluno/:nome/sub/:a/:b", (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const resultado = a - b;
    res.send(`O resultado da subtração é: ${resultado}`)
})


app.get("/aluno/:nome/multi/:a/:b", (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const resultado = a * b;
    res.send(`O resultado da multiplicação é: ${resultado}`)
})


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/Menu");
})