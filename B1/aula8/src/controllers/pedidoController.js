const pedidosBD = require('../database/pedidos');
// Controller para buscar o pedido (Já passou pelos middlewares de segurança)
function obterPedido(req, res) {
 return res.json({
 status: 'Sucesso',
 mensagem: 'Pedido recuperado com segurança!',
 data: req.pedido
 });
}
// Controller para deletar o pedido (Já passou pelo middleware BFLA - Exclusivo ADMIN)
function deletarPedido(req, res) {
 const pedidoId = req.params.id;
 delete pedidosBD[pedidoId];
 return res.json({
 status: 'Sucesso',
 mensagem: `Pedido ${pedidoId} excluído com sucesso do sistema!`
 });
}
module.exports = {
 obterPedido,
 deletarPedido
};
