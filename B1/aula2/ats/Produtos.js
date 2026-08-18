const express = require("express");
const app = express();
app.use(express.json());
let id = 5;


const produtos = [
    { id: 1, nome: "Notebook", preco: 3500 },
    { id: 2, nome: "Mouse", preco: 80 },
    { id: 3, nome: "Teclado", preco: 150 },
    { id: 4, nome: "Monitor", preco: 1200 }
];


//get
app.get("/Produtos"
    , (req, res) => {
        res.json(produtos);
    });

app.get("/caros", (req, res) => {
    const produtosCaros = produtos.filter(p => p.preco > 1000);
    res.json(produtosCaros);
});

app.get("/baratos", (req, res) => {
    const produtosBaratos = produtos.filter(p => p.preco < 200);
    res.json(produtosBaratos);
});


app.get("/Produtos/:id"
    , (req, res) => {
        const produto = produtos.find(p => p.id ==
            req.params.id);
        if (!produto) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }
        res.json(produto);
    });


//post
app.post("/Produto"
    , (req, res) => {
        const { nome, preco } = req.body;
        if (!nome || !preco) {
            return res.status(400).json({
                erro: "Dados inválidos"
            });
        }
        const novoProduto = {
            id: id++
            ,
            nome,
            preco
        };
        produtos.push(novoProduto);
        res.status(201).json(novoProduto);
    });


//put
app.put("/Produto/:id"
    , (req, res) => {
        const produto = produtos.find(p => p.id ==
            req.params.id);
        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }
        const { nome, preco } = req.body;
        if (nome) produto.nome = nome;
        if (preco) produto.preco = preco;
        res.json(produto);
    });


//delete
app.delete("/Produto/:id"
    , (req, res) => {
        const index = produtos.findIndex(p => p.id ==
            req.params.id);
        if (index === -1) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }
        produtos.splice(index, 1);
        res.json({ mensagem: "Produto removido" });
    });


//porta pra subir o servidor
app.listen(3002, () => {
    console.log("Servidor rodando na porta 3002");
});