const express = require("express");
const app = express();
app.use(express.json());
let id = 6;

const filmes = [
    { id: 1, titulo: "A Origem", ano: 2010, nota: 10 },
    { id: 2, titulo: "A Familia do Futuro", ano: 2007, nota: 9 },
    { id: 3, titulo: "Homem-Aranha", ano: 2002, nota: 8 },
    { id: 4, titulo: "Interestelar", ano: 2014, nota: 10 },
    { id: 5, titulo: "Click", ano: 2006, nota: 9 }
];


//get
app.get("/filmes"
    , (req, res) => {
        res.json(filmes);
    });
app.get("/filme/:id"
    , (req, res) => {
        const filme = filmes.find(p => p.id ==
            req.params.id);
        if (!filme) {
            return res.status(404).json({
                erro: "Filme não encontrado"
            });
        }
        res.json(filme);
    });


//post
app.post("/filme"
    , (req, res) => {
        const { titulo, ano, nota } = req.body;
        if (!titulo || !ano || !nota === undefined) {
            return res.status(400).json({
                erro: "Dados inválidos"
            });
        }
        const novoFilme = {
            id: id++,
            titulo,
            ano: Number(ano),
            nota: Number(nota)
        };
        filmes.push(novoFilme);
        res.status(201).json(novoFilme);
    });


//put
app.put("/filmes/:id"
    , (req, res) => {
        const filme = filmes.find(p => p.id ==
            req.params.id);
        if (!filme) {
            return res.status(404).json({ erro: "Filme não encontrado" });
        }
        const { titulo, ano, nota } = req.body;
        if (titulo) filme.titulo = titulo;
        if (ano) filme.ano = ano;
        if (nota) filme.nota = nota;
        res.json(filme);
    });


//delete
app.delete("/filme/:id"
    , (req, res) => {
        const index = filmes.findIndex(p => p.id ==
            req.params.id);
        if (index === -1) {
            return res.status(404).json({
                erro: "Filme não encontrado"
            });
        }
        filmes.splice(index, 1);
        res.json({ mensagem: "Filme removido" });
    });


//porta pra subir o servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});