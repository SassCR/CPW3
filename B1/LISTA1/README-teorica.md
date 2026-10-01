# Parte 1 — Conceitos iniciais

### 1. O que é Node.js e sua função em uma aplicação web.

Node.js é uma ferramenta que permite usar JavaScript fora do navegador. Em uma aplicação web ele pode ser usado para criar o servidor, receber requisições e enviar respostas.

### 2. Diferença entre JavaScript no navegador e com Node.js.

No navegador o JavaScript é usado principalmente para mexer na página e interagir com o usuário. Com Node.js ele pode ser usado no servidor para criar APIs, mexer em arquivos e acessar banco de dados.

### 3. O que é NPM.

NPM é um gerenciador de pacotes do Node.js. Ele serve para instalar e administrar pacotes e bibliotecas que o projeto precisa.

### 4. Função do package.json.

O `package.json` guarda informações do projeto, como o nome, versão, dependências e comandos que podem ser usados para iniciar o projeto.

### 5. Por que node_modules não é enviado ao GitHub.

Porque a pasta pode ficar muito grande e os pacotes podem ser instalados novamente usando o `package.json` com o comando `npm install`.

---

# Parte 2 — Rotas, requisições e respostas

### 11. O que é uma rota/endpoint.

É um endereço da API que realiza uma determinada função. Por exemplo, `GET /jogos` serve para buscar os jogos.

### 12. Função de req.

`req` representa a requisição que chegou no servidor. Com ele podemos pegar informações como `req.body` e `req.params`.

### 13. Função de res.

`res` é usado para enviar uma resposta do servidor para quem fez a requisição.

### 14. Diferença entre res.send() e res.json().

`res.send()` pode enviar textos e outros tipos de resposta. `res.json()` é usado para enviar uma resposta no formato JSON.

### 15. Significado de API REST/RESTful.

É uma forma de organizar uma API usando recursos e métodos HTTP, como GET, POST, PUT e DELETE.

### 16. Finalidade de GET, POST, PUT e DELETE.

* GET: buscar dados.
* POST: criar dados.
* PUT: alterar dados.
* DELETE: excluir dados.

### 17. Diferença entre req.body e req.params.

`req.body` pega os dados enviados no corpo da requisição, como os dados de um jogo.

`req.params` pega informações que estão na própria URL, como o ID de um jogo.

### 18. Função do express.json().

Ele permite que o Express consiga receber e entender dados enviados no formato JSON no corpo da requisição.

---

# Parte 4 — POST

### 43. Por que PUT é diferente de POST.

POST normalmente é usado para criar um novo registro. PUT é usado para alterar um registro que já existe.

---

# Parte 7 — Arrays

### 56. Diferença entre find(), findIndex() e filter().

`find()` procura um item e retorna o primeiro que encontrar.

`findIndex()` procura um item e retorna a posição dele no array.

`filter()` procura vários itens que atendem uma condição e retorna esses itens em um novo array.

### 57. Diferença entre push() e splice().

`push()` adiciona um item no final do array.

`splice()` pode remover ou alterar itens em uma determinada posição do array.

---

# Parte 8 — JSON

### 58. O que é JSON.

JSON é um formato usado para organizar e trocar dados. Ele é muito usado em APIs e arquivos.

### 59. Função de JSON.parse().

`JSON.parse()` transforma um texto JSON em um objeto ou array que o JavaScript consegue usar.

### 60. Função de JSON.stringify().

`JSON.stringify()` transforma um objeto ou array do JavaScript em texto JSON.

### 61. Por que o arquivo JSON precisa ser lido como texto antes de ser manipulado.

Porque o arquivo é armazenado como texto. Primeiro precisamos ler esse texto e depois usar `JSON.parse()` para transformar em objeto ou array.

### 62. Finalidade de null, 2 no JSON.stringify().

O `null` é usado para não substituir nenhum valor e o `2` serve para deixar o JSON organizado com espaços e indentação.

Exemplo:

```js
JSON.stringify(jogos, null, 2)
```

### 63. Pelo menos três regras de sintaxe de JSON válido.

1. Os nomes das propriedades usam aspas duplas.
2. Os textos usam aspas duplas.
3. Os dados são separados por vírgula.
4. Objetos usam `{}`.
5. Arrays usam `[]`.

### 64. Diferença entre objeto JavaScript em memória e texto em arquivo .json.

O objeto JavaScript está sendo usado pelo programa na memória. O arquivo `.json` guarda os dados como texto. Para usar o conteúdo do arquivo como objeto, usamos `JSON.parse()`.

---

# Parte 9 — Persistência

### 72. Por que os dados permanecem depois de desligar o servidor.

Porque os dados são salvos no arquivo `jogos.json`. Quando o servidor inicia novamente, ele lê os dados desse arquivo.

---

# Parte 10 — Arquivos TXT

### 83. Diferença entre writeFile e appendFile.

`writeFile` escreve no arquivo e pode substituir o conteúdo que já estava lá.

`appendFile` adiciona um novo conteúdo no final do arquivo sem apagar o conteúdo anterior.

### 84. O que acontece com o conteúdo anterior ao usar writeFile.

O conteúdo anterior pode ser substituído pelo novo conteúdo.

### 85. Finalidade de readFile.

`readFile` serve para ler o conteúdo de um arquivo.

---

# Parte 11 — fs

### 86. Função de fs.unlink().

`fs.unlink()` serve para excluir um arquivo.

### 87. O que acontece ao usar fs.unlink().

O arquivo informado é excluído do computador.

### 88. Associar criar/escrever, ler, acrescentar e excluir aos métodos.

* Criar/escrever: `writeFile`
* Ler: `readFile`
* Acrescentar: `appendFile`
* Excluir: `unlink`

### 89. O que significa o erro ENOENT.

Significa que o arquivo ou diretório informado não foi encontrado.

### 90. Situação do projeto em que ENOENT pode ocorrer.

Pode acontecer se o `jogos.json` não existir ou se o caminho informado estiver errado.

---

# Parte 12 — path

### 91. Para que serve o módulo path.

O módulo `path` serve para trabalhar com caminhos de arquivos e pastas.

### 92. Por que caminhos escritos manualmente podem causar problemas entre sistemas.

Porque cada sistema pode trabalhar com caminhos e separadores de pastas de uma forma diferente.

### 95. Vantagem de utilizar path.join().

`path.join()` monta o caminho corretamente de acordo com o sistema operacional, deixando o código mais seguro e organizado.

---

# Parte 13 — Tratamento de erros

### 96. Função do try/catch.

O `try/catch` serve para tentar executar um código e, se acontecer um erro, conseguir tratar esse erro sem deixar o programa quebrar.

---

# Parte 14 — Síncrono, assíncrono e Event Loop

### 101. Diferença entre operação síncrona e assíncrona.

Na operação síncrona, o programa espera uma tarefa terminar para continuar.

Na operação assíncrona, o programa pode continuar fazendo outras coisas enquanto espera a tarefa terminar.

### 102. O que acontece quando uma operação síncrona demorada bloqueia o servidor.

O servidor fica esperando essa operação terminar. Enquanto isso, ele pode ficar sem conseguir atender outras requisições.

### 103. Por que operações assíncronas são preferíveis em rotas.

Porque elas não ficam prendendo o servidor esperando uma operação terminar, permitindo que outras requisições sejam atendidas.

### 104. O que é uma Promise.

É um objeto que representa o resultado de uma operação que ainda pode estar sendo executada.

Ela pode terminar com sucesso ou com erro.

### 105. Função de async.

`async` indica que uma função trabalha de forma assíncrona e permite usar `await` dentro dela.

### 106. Função de await.

`await` faz o código esperar o resultado de uma Promise antes de continuar naquela parte da função.

### 107. Comparação entre readFileSync e readFile.

`readFileSync` é síncrono e espera a leitura terminar.

`readFile` é assíncrono e permite que o programa continue enquanto o arquivo está sendo lido.

---

# Parte 15 — Middlewares

### 109. O que é middleware no Express.

Middleware é uma função que fica no meio do caminho entre a requisição e a resposta. Ele pode verificar ou modificar alguma coisa antes da rota continuar.

### 110. Por que express.json() é um middleware.

Porque ele recebe a requisição e prepara o JSON do corpo para que depois possa ser acessado pelo `req.body`.

### 111. Duas outras responsabilidades de um middleware.

Ele pode verificar autenticação de um usuário e também pode registrar informações sobre as requisições.

### 112. Momento em que o middleware atua no fluxo requisição → rota → resposta.

Ele atua depois que a requisição chega e antes da resposta ser enviada, podendo deixar a requisição continuar para a rota.

---

# Parte 16 — Sessões e Cookies

### 113. Por que HTTP é stateless.

Porque o HTTP não guarda sozinho informações das requisições anteriores. Cada requisição é tratada separadamente.

### 114. O que é Cookie.

Cookie é uma pequena informação que um site salva no navegador do usuário.

### 115. O que é Sessão.

Sessão é uma forma de guardar informações temporárias sobre um usuário enquanto ele está usando o sistema.

### 116. Onde ficam armazenados os dados de um Cookie.

Os dados do Cookie ficam armazenados no navegador do usuário.

### 117. Onde ficam armazenados os dados de uma Sessão.

Normalmente os dados da sessão ficam armazenados no servidor.

### 118. Como Cookie e Sessão trabalham juntos.

O servidor pode guardar os dados do usuário na sessão e enviar um Cookie para o navegador com um identificador da sessão. Quando o usuário faz outra requisição, o Cookie ajuda o servidor a saber qual sessão pertence a ele.

### 119. Exemplo de uso de Cookie.

Um exemplo é guardar uma preferência do usuário, como o idioma escolhido em um site.

### 120. Exemplo de uso de Sessão.

Um exemplo é guardar que o usuário está logado em um sistema.

### 121. O que é Session ID.

É um identificador usado para saber qual sessão pertence a determinado usuário.
