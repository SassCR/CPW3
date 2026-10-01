function autorizarCargo(...cargosPermitidos) {
 return (req, res, next) => {
 // 1. Verifica se os dados do usuário estão presentes no req.user
 if (!req.user) {
 return res.status(401).json({ error: 'Usuário não autenticado' });
 }
 // 2. REGRA DE OURO BFLA:
 // Verifica se o papel/cargo (role) do usuário do JWT está presente na lista de cargos
autorizados
 if (!cargosPermitidos.includes(req.user.role)) {
 return res.status(403).json({
 error: 'Acesso negado: Seu perfil não possui permissão para executar esta função'
 });
 }
 // 3. Se possuir a role exigida, avança
 next();
 };
}
module.exports = autorizarCargo;