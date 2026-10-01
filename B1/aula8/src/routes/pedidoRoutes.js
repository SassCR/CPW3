const express = require('express');
const router = express.Router();
// Importação dos Middlewares
const autenticarJWT = require('../middlewares/authMiddleware.js');
const verificarPossePedido = require('../middlewares/bolaMiddleware.js');
const autorizarCargo = require('../middlewares/bflaMiddleware.js');
// Importação do Controller
const pedidoController = require('../controllers/pedidoController');
// ROTA 1: GET /api/pedidos/:id
// Protegida por Autenticação JWT + Proteção contra BOLA/IDOR
router.get('/:id', autenticarJWT, verificarPossePedido, pedidoController.obterPedido);
// ROTA 2: DELETE /api/pedidos/:id
// Protegida por Autenticação JWT + Proteção contra BFLA (Apenas cargo ADMIN)
router.delete('/:id', autenticarJWT, autorizarCargo('ADMIN'),
pedidoController.deletarPedido);
module.exports = router;


