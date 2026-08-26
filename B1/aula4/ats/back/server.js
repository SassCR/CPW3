const express = require("Express");
const fs = require("node:fs");
const path = require("node:path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "../front/index.html"));
})


app.post("/estudo", (req, res) => {
    const { nome, mensagem } = req.body;
    const linha = `${nome}: ${mensagem}\n`;
    fs.appendFileSync("notas.txt", linha, "utf-8");

    
    res.redirect("/notas");
});


app.get("/notas", (req, res) => {
    if (!fs.existsSync("notas.txt")) {
        return res.send(`Nenhuma anotação cadastrada ainda. <br><br><a href="/">Enviar primeira anotação!</a>`);
    }
    const conteudo = fs.readFileSync("notas.txt", "utf-8");
    res.send(`
        <h1>Anotação para estudos!</h1>
        <pre>${conteudo}</pre>
        <a href="/">Enviar outra anotação...</a>
        `);

});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));


