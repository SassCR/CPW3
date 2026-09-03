const { error } = require("console");
const fs = require("fs/promises");
async function converterTxParaJson() {
    try {
        const textoBruto = await fs.readFile('dados_brutos.txt', 'utf-8');


        const linhas = textoBruto.split('\n').filter(linha => linha.trim() !== "");

        const alunosObjeto = linhas.map(linha => {
            const [nome, nota, curso] = linha.split(",");
            return {
                nome: nome.trim(),
                nota: Number(nota.trim()),
                curso: curso.trim()
            }
        });

        
        const textoJson = JSON.stringify(alunosObjeto, null, 2);

        await fs.writeFile("alunos_convertidos.json", textoJson);
        console.log("Sucesso! Arquivo " + " aluno_convertido.json " + "Criado com estrutura de dados.");
    }catch (erro) {
        console.log("Erro ao tentar converter", erro);
        
    }
};

converterTxParaJson();