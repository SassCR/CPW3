const { error } = require("console");
const fs = require("fs/promises");
async function converterJsonParaTx() {
    try {
        const textoJson = await fs.readFile('alunos_convertidos.json', 'utf-8');
        const alunos = JSON.parse(textoJson);
        const texto = alunos.map(aluno => {
            return `${aluno.nome}, ${aluno.email}, ${aluno.telefone}`
        }).join("\n");

        await fs.writeFile("dados_convertidos.txt", texto);

        console.log(`SUCESSO:Arquivo alunos_convertidos.json, convertido com sucesso para dados_convertidos.txt!`);
    }catch (erro) {
        console.log("Erro ao tentar converter", erro);
        
    }
};

converterJsonParaTx();