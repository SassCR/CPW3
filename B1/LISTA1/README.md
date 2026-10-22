# Catálogo de Jogos

Projeto desenvolvido em **Node.js com Express** para criar uma API de gerenciamento de jogos.

A API permite cadastrar, consultar, atualizar e excluir jogos, além de salvar os dados em um arquivo JSON e registrar as alterações em um arquivo TXT.

## Tecnologias utilizadas

* Node.js
* Express
* Nodemon
* JavaScript
* JSON
* Arquivos TXT

## Como instalar

Primeiro, abra o terminal na pasta do projeto e execute:

```bash
npm install
```

Esse comando instala as dependências do projeto, incluindo o **Express** e o **Nodemon**.

## Como iniciar

Para iniciar o servidor normalmente:

```bash
npm start
```

Para iniciar usando o **Nodemon**, que reinicia o servidor automaticamente quando o código é alterado:

```bash
npm run dev
```

O servidor será iniciado na porta:

```text
http://localhost:3000
```

## Estrutura do projeto

```text
dados-node-reademe-server/
│
├── server.js
├── package.json
├── README.md
├── README-TEORICA.md
├── README-PRATICA.md
│
└── dados/
    ├── jogos.json
    └── historico.txt
```

## Documentação

### Teórica

As perguntas e respostas teóricas estão no arquivo:

[README-TEORICA.md](README-TEORICA.md)

### Prática

Os procedimentos realizados, testes e prints do Postman estão no arquivo:

[README-PRATICA.md](README-PRATICA.md)

## Rotas principais

* `GET /` — Verifica se o servidor está funcionando.
* `GET /jogos` — Lista os jogos.
* `GET /jogos/:id` — Busca um jogo pelo ID.
* `POST /jogos` — Cadastra um novo jogo.
* `PUT /jogos/:id` — Atualiza um jogo.
* `DELETE /jogos/:id` — Remove um jogo.
* `GET /jogos/melhores` — Mostra jogos com nota maior ou igual a 8.
* `GET /historico` — Mostra o histórico das alterações.

## Armazenamento dos dados

Os dados dos jogos são armazenados no arquivo `dados/jogos.json`.

As alterações realizadas nos jogos são registradas no arquivo `dados/historico.txt`.

## Observação

A pasta `node_modules` não faz parte do repositório, pois as dependências podem ser instaladas novamente usando o comando `npm install`.
