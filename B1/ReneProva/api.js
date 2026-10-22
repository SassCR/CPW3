const express = require("express");
const api = express();

const musicas =
    [
        {
            "id": 1,
            "artista": "Roberto Carlos",
            "titulo": "Perneta",
            "nota": 10
        },
        {
            "id": 2,
            "artista": "Teddy Swims",
            "titulo": "Lose Control (The Village Sessions)",
            "nota": 5
        },
        {
            "id": 3,
            "artista": "Radiohead",
            "titulo": "Creep (Acoustic Version)",
            "nota": 9
        },
        {
            "id": 4,
            "artista": "Yeah Yeah Yeahs",
            "titulo": "Burning",
            "nota": 10
        },
        {
            "id": 5,
            "artista": "Amy Winehouse",
            "titulo": "Back To Black",
            "nota": 10
        },
        {
            "id": 6,
            "artista": "Florence + The Machine",
            "titulo": "Dog Days Are Over",
            "nota": 9
        }
    ]


api.use(express.json());

api.get("/Musicas", (req, res) => {
    res.send(musicas)
})


api.get("/Musicas/Top", (req, res) => {
    const top = musicas.filter(musicas => musicas.nota >= 9)
    res.json(top)
})


api.get("/Musicas/:id", (req, res) => {
    const idMusica = Number(req.params.id);
    const encontrar = musicas.find(musica => musica === idMusica)
    if (!encontrar) {
        res.status(404).send("ERRO:Musica não encontrada!")
    } else {
        res.json(encontrar)
    }
});

api.post("/Musicas/add", (req, res) => {
    const { artista, titulo, nota } = req.body
    if (!artista || !titulo || nota === undefined) {
        return res.status(400).send("ERRO: Preencha os campos artista, titulo e nota!")
    };

    const novoID = musicas.length > 0 ? musicas[musicas.length - 1].id + 1 : 1;

    const novaMusica = {
        id: novoID,
        artista: artista,
        titulo: titulo,
        nota: nota
    };
    musicas.push(novaMusica)
    res.status(201).json(novaMusica)
});

api.delete("/Musicas/:id", (req, res) => {
    const idMusica = Number(req.params.id);
    const deletar = musicas.findIndex(musica => musica.id === idMusica);
    if(deletar === -1){
        return res.status(404).send("ERRO:Musica não encontrada!");
    }
    musicas.splice(deletar, 1)
    res.status(200).send("Musica deletada com sucesso!")
});



api.listen(3001, () => console.log("Servidor rodando em http://localhost:3001")
)