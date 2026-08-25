



const fc = require("node:fs/promises");

async function lerMeuarquivo (){
    try {
        const data = await fstat.readfile("texto2.txt", "utf8");
        console.log("Conteudo do arquivo:", data);
    }catch (erro) {
        console.log("ERRO AO TENTAR LER O ARQUIVO!", erro.message);
        
    }
}
lerMeuarquivo();