require('dotenv').config();
const express = require('express');
const pedidoRoutes = require('./routes/pedidoRoutes');
const app = express();
app.use(express.json());
// Registro do prefixo /api/pedidos para o roteador
app.use('/api/pedidos', pedidoRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`==================================================`);
 console.log(`Servidor de Segurança rodando na porta ${PORT}`);
 console.log(`URL Base: http://localhost:${PORT}`);
 console.log(`==================================================`);
});
