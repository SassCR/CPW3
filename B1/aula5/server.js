const { error } = require("console");
const fs = require("fs/promises");
async function converterTxParaJson() {
    try {
        const textoBruto = await fs.readFile('dados_brutos.txt', 'utf-8');
        // quebra o texto em um array de linhas
        // trim() e o filter ajudam a ignorar linhas vazias
        const linhas = textoBruto.split('\n').filter(linha => linha.trim() !== "");// pega cada linha e transforma num Objeto JavaScript

        
        const alunosObjeto = linhas.map(linha => {
            const [nome, nota, curso] = linha.split(",");  // divide os dados pela virgula
            return {
                nome: nome.trim(),// trim() tira os espaços em branco sobrando
                nota: Number(nota.trim()), // transforma a nota de texto para numero
                curso: curso.trim()
            }
        });

        // transforma o array/Objeto JS em uma string formato JSON
        // o (dados, null, 2) serve para deixar o JSON formatado bonitinho com recuo de 2 espaços
        const textoJson = JSON.stringify(alunosObjeto, null, 2);
        // salva no disco rigido como um arquivo .json

        await fs.writeFile("alunos_convertidos.json", textoJson);
        console.log("Sucesso! Arquivo " + " aluno_convertido.json " + "Criado com estrutura de dados.");
    } catch (erro) {
        console.log("Erro ao tentar converter", erro);

    }
};

converterTxParaJson();