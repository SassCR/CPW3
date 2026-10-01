const express = require("express");
const api = express();
const fs = require("fs");
const path = require("path");
const porta = 3000;

api.use(express.json())
const caminhoJogos = path.join(__dirname, "dados", "jogos.json");
const caminhoHistorico = path.join(__dirname, "dados", "historico.txt");

//controle de erros
let jogos = [];
try {
    const dados = fs.readFileSync(caminhoJogos, "utf8");
    jogos = JSON.parse(dados);
} catch (erro) {
    console.log("Erro ao ler jogos.json:", erro.message);
};


api.get("/", (req, res) => {
    res.send("Servidor rodando liso")
});//GET para testar se o servidor está rodando certo.

api.get("/jogos", (req, res) => {
    res.json(jogos)
});//GET para mostra os jogos cadastrados

api.get("/jogos/melhores", (req, res) => {
    const melhores = jogos.filter(jogos => jogos.nota >= 8)
    res.json(melhores)
});//GET para buscar os melhores jogos

api.get("/jogos/:id", (req, res) => {
    const idJogo = Number(req.params.id)
    const encontrar = jogos.find(jogo => jogo.id === idJogo)
    if (!encontrar) {
        return res.status(404).send("jogo não encontrado!")
    } else {
        res.json(encontrar)
    }
});//GET para buscar por jogo pelo ID

api.get("/historico", (req, res) => {
    const historico = fs.readFileSync(caminhoHistorico, "utf8");

    res.type("text").send(historico);
});//GET Para visualizar as alterações.

api.post("/jogos", (req, res) => {
    const { nome, preco, moeda, genero, nota } = req.body;
    if (!nome || preco === undefined || !genero || nota === undefined) {
        return res.status(400).send("ERRO: Os campos 'nome', 'preco' e 'genero' são obrigatorios ")
    };//Aqui nesse post eu fiz a verificação se colocaram o nome, preco e genero.


    const novoID = jogos.length > 0 ? jogos[jogos.length - 1].id + 1 : 1;
    //Fiz uma variavel para toda vez que coloca um jogo no ele vai acrescentar um id automatico


    const novoJogo = {
        id: novoID,
        nome: nome,
        preco: preco,
        moeda: moeda || "BRL",
        genero: genero,
        nota: nota
    };
    jogos.push(novoJogo);

    try {
        fs.writeFileSync(
            caminhoJogos,
            JSON.stringify(jogos, null, 4)
        );

        fs.appendFileSync(
            caminhoHistorico,
            `Jogo cadastrado: ${novoJogo.nome}\n`
        );
    } catch (erro) {
        return res.status(500).send("Erro ao salvar os dados.");
    };

    res.status(201).json(novoJogo);
});//Post para adicionar novos jogos a lista


api.put("/jogos/:id", (req, res) => {
    const IDparam = Number(req.params.id);
    const { nome, preco, genero, moeda, nota } = req.body;


    if (!nome || preco === undefined || !genero || !nota) {
        return res.status(400).send("ERRO: informe o nome, preco e genero! ");
    };

    const indiceJogo = jogos.findIndex(jogo => jogo.id === IDparam);

    if (indiceJogo === -1) {
        return res.status(404).send("ERRO: Jogo não encontrado para edição.")
    };
    jogos[indiceJogo] = {
        id: IDparam,
        nome: nome,
        preco: preco,
        moeda: moeda || "BRL",
        genero: genero,
        nota: nota
    }

    try {
        fs.writeFileSync(
            caminhoJogos,
            JSON.stringify(jogos, null, 4)
        );

        fs.appendFileSync(
            caminhoHistorico,
            `Jogo atualizado: ${jogos[indiceJogo].nome}\n`
        );
    } catch (erro) {
        return res.status(500).send("Erro ao salvar os dados.");
    }

    res.status(200).json(jogos[indiceJogo]);
});//Put para alterar nome, preco, moeda, genero ou nota do jogo pelo id.

api.delete("/jogos/:id", (req, res) => {
    const IDparam = Number(req.params.id);
    const indice = jogos.findIndex(jogo => jogo.id === IDparam)
    if (indice === -1) {
        return res.status(404).send("Jogo não encontrado!")
    }
    const jogoRemovido = jogos[indice];

    jogos.splice(indice, 1);

    try {
        fs.writeFileSync(
            caminhoJogos,
            JSON.stringify(jogos, null, 4)
        );

        fs.appendFileSync(
            caminhoHistorico,
            `Jogo removido: ${jogoRemovido.nome}\n`
        );
    } catch (erro) {
        return res.status(500).send("Erro ao salvar os dados.");
    }
    res.status(200).send("Jogo removido com sucesso!");
});//Delete para fazer o jogo sumir da lista




api.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send("ERRO: O JSON enviado no corpo da requisição tem um erro de sintaxe.");
    }
    next();
});//Verificador de erro para saber se a estrutura json está correta, ao tenta fazer um Post ou Put.

api.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta} `);
});
