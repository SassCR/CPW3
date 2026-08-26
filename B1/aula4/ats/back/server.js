const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "../front/index.html"));
})


app.post("/estudo", (req, res) => {
    const { materia, aprendizado } = req.body;
    const linha = `${materia}: ${aprendizado}\n`;
    fs.appendFileSync("notas.txt", linha, "utf-8");


    res.redirect("/notas");
});


app.get("/notas", (req, res) => {
    if (!fs.existsSync("notas.txt")) {
        return res.send(`Nenhuma anotação cadastrada ainda. <br><br><a href="/">Enviar primeira anotação!</a>`);
    }
    const conteudo = fs.readFileSync("notas.txt", "utf-8");
    res.send(`   
    <div class="grande" style="width: 500px; margin: 50px auto; padding: 30px; color: white; background-color: rgb(0, 0, 0); border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); font-family: Arial, Helvetica, sans-serif;">
        <h1 style="margin-top: 0; font-family: Arial, Helvetica, sans-serif;">Anotação para estudos!</h1>
        <pre style="white-space: pre-wrap; font-family: Arial, Helvetica, sans-serif; background: #222; padding: 15px; border-radius: 8px;">${conteudo}</pre>
        <a href="/" style="display: block; width: fit-content; margin: 25px auto 0; padding: 12px 24px; background-color: #333; color: rgb(150, 100, 255); text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; text-align: center; border: none; cursor: pointer; transition: background-color 0.2s;">Enviar outra anotação...</a>
    </div>`);

});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));


