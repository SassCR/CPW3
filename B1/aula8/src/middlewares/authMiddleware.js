const jwt = require('jsonwebtoken');
function autenticarJWT(req, res, next) {
 const authHeader = req.headers.authorization;
 // 1. Verifica se o header Authorization foi enviado
 if (!authHeader) {
 return res.status(401).json({ error: 'Token de autenticação não fornecido' });
 }
 // 2. O header vem no formato "Bearer <TOKEN>". Extraímos apenas o token
 const token = authHeader.split(' ')[1];
 if (!token) {
 return res.status(401).json({ error: 'Formato de token inválido' });
 }
 try {
 // 3. Valida a assinatura e expiração do token com a chave secreta
 const decoded = jwt.verify(token, process.env.JWT_SECRET ||
'chave_secreta_laboratorio_ifms_2026');

 // 4. Injeta os dados do usuário extraídos do token na requisição (req.user)
 req.user = decoded;

 // 5. Permite que a requisição siga para o próximo middleware/controller
 next();
 } catch (err) {
 return res.status(401).json({ error: 'Token inválido ou expirado' });
 }
}
module.exports = autenticarJWT;
