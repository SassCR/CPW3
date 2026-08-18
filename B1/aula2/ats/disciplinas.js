const express = require("express");
const app = express();
app.use(express.json());
let disciplinas = [];
let id = 1;
//get
app.get("/disciplinas"
    , (req, res) => {
        res.json(disciplinas);
    });


app.get("/disciplinas/:id"
    , (req, res) => {
        const disciplina = disciplinas.find(p => p.id ==
            req.params.id);
        if (!disciplina) {
            return res.status(404).json({ erro: "Disciplina não encontrada" });
        }
        res.json(disciplina);
    });


//post
app.post("/disciplinas"
    , (req, res) => {
        const { nome, professor, horas } = req.body;
        if (!nome || !professor || !horas) {
            return res.status(400).json({ erro: "Dados inválidos" });
        }
        const novaDisciplina = {
            id: id++
            ,
            nome,
            professor,
            horas
        };
        disciplinas.push(novaDisciplina);
        res.status(201).json(novaDisciplina);
    });


//put
app.put("/disciplinas/:id"
    , (req, res) => {
        const id = parseInt(req.params.id);
        const { nome, professor, horas } = req.body;

        const disciplina = disciplinas.find(d => d.id === id);

        if (!disciplina) {
            return res.status(404).send("Disciplina não encontrada!");
        }

        if (nome) disciplina.nome = nome;
        if (professor) disciplina.professor = professor;
        if (horas) disciplina.horas = horas;
        res.json({
            mensagem: "Disciplina atualizada com sucesso!",
            Disciplina: disciplina
        })
    });


//delete
app.delete("/disciplinas/:id"
    , (req, res) => {
        const index = disciplinas.findIndex(p => p.id ==
            req.params.id);
        if (index === -1) {
            return res.status(404).json({ erro: "Disciplina não encontrada" });
        }
        disciplinas.splice(index, 1);
        res.json({ mensagem: "Disciplina removida com sucesso!" });
    });


//porta pra subir o servidor
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});