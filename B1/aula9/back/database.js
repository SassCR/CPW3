// database.js
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error('Erro ao abrir banco de dados:', err.message);
  else console.log('âœ… Banco de dados SQLite conectado.');
});

db.serialize(() => {
  // Criar Tabela de UsuÃ¡rios
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'CLIENTE'
    )
  `);

  // Criar Tabela de Pedidos
  db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL,
      descricao TEXT NOT NULL,
      valor REAL NOT NULL,
      FOREIGN KEY (cliente_id) REFERENCES usuarios (id)
    )
  `);

  
  // Cadastrar os carros iniciais
  db.get("SELECT COUNT(*) AS total FROM carros", [], (err, row) => {
    if (err) {
      console.error("Erro ao consultar carros:", err.message);
      return;
    }

    if (row.total === 0) {
      const carros = [
        [
          "PFISTER COMET SAFARI",
          "classico",
          "CLÁSSICO / RALLY",
          710000,
          "assets/comet-safari.webp",
          "Um esportivo com espírito aventureiro."
        ],
        [
          "OCELOT PARIAH",
          "supercarro",
          "ALTA PERFORMANCE",
          1420000,
          "assets/pariah.webp",
          "Design aerodinâmico e visual marcante."
        ],
        [
          "ÜBERMACHT SC1",
          "supercarro",
          "EDIÇÃO PREMIUM",
          1603000,
          "assets/sc1.webp",
          "Linhas modernas e acabamento de alto nível."
        ]
      ];

      carros.forEach(carro => {
        db.run(
          `INSERT INTO carros
          (nome, categoria, etiqueta, preco, imagem, descricao)
          VALUES (?, ?, ?, ?, ?, ?)`,
          carro,
          (erro) => {
            if (erro) console.error("Erro ao cadastrar carro:", erro.message);
          }
        );
      });

      console.log("Carros iniciais cadastrados!");
    }
  });

    // Criar Tabela de Carros
  db.run(`
    CREATE TABLE IF NOT EXISTS carros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      categoria TEXT NOT NULL,
      etiqueta TEXT NOT NULL,
      preco REAL NOT NULL,
      imagem TEXT NOT NULL,
      descricao TEXT NOT NULL
    )
  `);

  // Popular dados iniciais (Seed)
  db.get("SELECT COUNT(*) AS total FROM usuarios", [], async (err, row) => {
    if (row && row.total === 0) {
      const senhaPadrao = await bcrypt.hash("123456", 10);

      // UsuÃ¡rios
      db.run(`INSERT INTO usuarios (nome, email, senha_hash, role) VALUES ('JoÃ£o Silva', 'joao@email.com', ?, 'CLIENTE')`, [senhaPadrao]);
      db.run(`INSERT INTO usuarios (nome, email, senha_hash, role) VALUES ('Maria Souza', 'maria@email.com', ?, 'CLIENTE')`, [senhaPadrao]);
      db.run(`INSERT INTO usuarios (nome, email, senha_hash, role) VALUES ('Admin Sistema', 'admin@email.com', ?, 'ADMIN')`, [senhaPadrao]);

      // Pedidos
      db.run(`INSERT INTO pedidos (cliente_id, descricao, valor) VALUES (1, 'Notebook Gamer', 4500.00)`);
      db.run(`INSERT INTO pedidos (cliente_id, descricao, valor) VALUES (2, 'Smartphone 5G', 2200.00)`);

      console.log('ðŸŒ± Dados de teste (Seed) inseridos com sucesso!');
    }
  });
});

module.exports = db;