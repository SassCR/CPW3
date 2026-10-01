const pedidosBD = require('../database/pedidos');
async function verificarPossePedido(req, res, next) {
 const pedidoId = req.params.id;
 const pedido = pedidosBD[pedidoId];
 // 1. Verifica se o recurso existe
 if (!pedido) {
 return res.status(404).json({ error: 'Pedido não encontrado' });
 }
 // 2. REGRA DE OURO BOLA:
 // Compara o usuarioId cadastrado no pedido com o id extraído do JWT (req.user.id)
 const eDonoDoPedido = pedido.usuarioId === req.user.id;
 const eAdministrador = req.user.role === 'ADMIN';
 // 3. Bloqueia se NÃO for o dono E NÃO for administrador
 if (!eDonoDoPedido && !eAdministrador) {
 return res.status(403).json({
 error: 'Acesso negado: Você não tem permissão para acessar este pedido'
 });
 }
 // 4. Se for autorizado, anexa o pedido na requisição e avança
 req.pedido = pedido;
 next();
}
module.exports = verificarPossePedido;
