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
//Tem que instala três extensões para funcionar a 
//SQLite
//SQLite DB Viewer
//SQLite IntelliView
//SQLTools SQLite