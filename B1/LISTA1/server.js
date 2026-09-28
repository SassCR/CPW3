const express = require("express");
const api = express()
const porta = 3000
const jogos =
    [
        {
            "id": 1,
            "nome": "GTA",
            "preco": 100,
            "moeda": "BRL",
            "genero": "Loucura"
        },
        {
            "id": 2,
            "nome": "Minecraft",
            "preco": 500,
            "moeda": "BRL",
            "genero": "Pedreiro"
        },
        {
            "id": 3,
            "nome": "Valorant",
            "preco": 0,
            "moeda": "BRL",
            "genero": "Trocação sincera"
        }
    ]
api.use(express.json());

api.get("/", (req, res) => {
    res.send("Servidor rodando liso")
})//GET para testar se o servidor está rodando certo.
api.get("/jogos", (req, res) => {
    res.send(jogos)
})//GET para mostra os jogos cadastrados

api.get("/jogos/:id", (req, res) => {
    const idJogo = Number(req.params.id)
    const encontrar = jogos.find(jogo => jogo.id === idJogo)
    if (!encontrar) {
        return res.status(404).send("jogo não encontrado!")
    } else {
        res.json(encontrar)
    }
});//GET para buscar por jogo pelo ID

api.post("/jogos", (req, res) => {
    const {nome, preco, moeda, genero} = req.body;
    if(!nome || preco === undefined || !genero){
        return res.status(400).send("ERRO: Os campos 'nome', 'preco', 'moeda' e 'genero' são obrigatorios ")
    }//Aqui nesse post eu fiz a verificação se colocaram o nome, preco e genero.


const novoID = jogos.length > 0 ? jogos[jogos.length - 1].id + 1 : 1;
//Fiz uma variavel para toda vez que coloca um jogo no ele vai acrescentar um id automatico


const novoJogo = {
    id: novoID,
    nome: nome,
    preco: preco,
    moeda: moeda || "BRL",
    genero: genero
};
jogos.push(novoJogo)
res.status(201).json(novoJogo)
});

api.put("/jogos/:id", (req, res) => {
    const IDparam = Number(req.params.id);
    const {nome, preco, genero, moeda} = req.body;


    if(!nome || preco === undefined || !genero){
        return res.status(400).send("ERRO: informe o nome e o preco! ");
    };

    const indiceJogo = jogos.findIndex(jogo => jogo.id === IDparam);

    if(indiceJogo === -1){
        return res.status(404).send("ERRO: Jogo não encontrado para edição.")
    };
    jogos[indiceJogo] = {
        id: IDparam,
        nome: nome, 
        preco: preco,
        moeda: moeda || "BRL",
        genero: genero
    }
    res.status(200).send("Jogo editado com sucesso!")
});


api.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta} `);
})
