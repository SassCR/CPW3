const express = require("express");
const app = express();
app.use(express.json());
let id = 6;

const musicas = [
    { id: 1, titulo: "Dark Red", artista: "Steve Lacy", nota: 10 },
    { id: 2, titulo: "Instant Crush", artista: "Daft Punk", nota: 9 },
    { id: 3, titulo: "Chop Suey!", artista: "System of a Down", nota: 8 },
    { id: 4, titulo: "Backstage", artista: "Matuê", nota: 7 },
    { id: 5, titulo: "Like This!", artista: "Matuê", nota: 6 }
];



//get
app.get("/musicas"
    , (req, res) => {
        res.json(musicas);
    });

app.get("/musicas/:id"
    , (req, res) => {
        const musica = musicas.find(p => p.id ==
            req.params.id);
        if (!musica) {
            return res.status(404).json({
                erro: "Musica não encontrada"
            });
        }
        res.json(musica);
    });

app.get("/artista/:nome", (req, res) => {
    const artistaNome = req.params.nome.toLocaleLowerCase();
    const buscarArtista = musicas.filter(m => m.artista.toLocaleLowerCase === artista)
    res.json(buscarArtista);

});


app.get("/top", (req, res) => {
    const musicasTop = musicas.filter(m => m.nota >= 9);
    res.json(musicasTop);
});



//post
app.post("/musica"
    , (req, res) => {
        const { titulo, artista, nota } = req.body;
        if (!titulo || !artista || nota === undefined) {
            return res.status(400).json({
                erro: "Dados inválidos"
            });
        }
        const novaMusica = {
            id: id++,
            titulo,
            artista,
            nota: Number(nota)
        };
        musicas.push(novaMusica);
        res.status(201).json(novaMusica);
    });



//put
app.put("/musica/:id"
    , (req, res) => {
        const musica = musicas.find(p => p.id ==
            req.params.id);
        if (!musica) {
            return res.status(404).json({ erro: "Musica não encontrada" });
        }
        const { titulo, artista, nota } = req.body;
        if (titulo) musica.titulo = titulo;
        if (artista) musica.artista = artista;
        if (nota) musica.nota = nota;
        res.json(musica);
    });


//delete
app.delete("/musica/:id"
    , (req, res) => {
        const index = musicas.findIndex(p => p.id ==
            req.params.id);
        if (index === -1) {
            return res.status(404).json({
                erro: "Musica não encontrada"
            });
        }
        musicas.splice(index, 1);
        res.json({ mensagem: "Musica removida" });
    });


//porta pra subir o servidor
app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});