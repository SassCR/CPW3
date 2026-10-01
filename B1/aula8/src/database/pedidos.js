// Simulação de banco de dados em memória
const pedidosBD = {
 'pedido_100': {
 id: 'pedido_100',
 usuarioId: 'usr_1', // Pertence ao Usuário A
 item: 'Notebook Dell Vostro',
 valor: 4500.00
 },
 'pedido_200': {
 id: 'pedido_200',
 usuarioId: 'usr_2', // Pertence ao Usuário B
 item: 'Monitor Ultrawide LG',
 valor: 1350.00
 }
};
module.exports = pedidosBD;