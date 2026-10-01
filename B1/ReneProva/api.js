const express = require("express");
const { arrayBuffer } = require("node:stream/consumers");
const api = express();

const musicas = 
[
    {
        "id": 1,
        "artista": "Roberto Carlos",
        "titulo": "Perneta",
        "nota": 9
    },
    {
        "id": 2,
        "artista": "Hello kity",
        "titulo": "colorida",
        "nota": 10
    },
    {
        "id": 3,
        "artista": "Xuxa",
        "titulo": "Balão magico",
        "nota": 1
    }
]


api.use(express.json());

api.get("/Musicas", (req, res) => {
    res.send(musicas)
})

api.get("/Musicas/:id", (req, res) => {
    const idPara =  Number(Array.params);
    const encontrar = res.send(id => id === idPara )
    if(erro){
     res.status(404).send("Musica não encontrada!")}
});



api.listen(3001, () => console.log("Servidor rodando em http://localhost:3001")
)