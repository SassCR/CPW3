
require("dotenv").config();

const nodemailer = require("nodemailer");

// Configurar o Gmail
const transporte = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_REMETENTE,
        pass: process.env.SENHA_APP
    }
});

// Gerar código de 4 dígitos
const codigo = Math.floor(1000 + Math.random() * 9000);

// Função para enviar email
async function enviarEmail() {
    try {
        await transporte.sendMail({
            from: process.env.EMAIL_REMETENTE,
            to: process.env.EMAIL_REMETENTE,
            subject: "Código de confirmação - Velocity Motorsport",
            text: `Seu código de confirmação é: ${codigo}`
        });

        console.log("Email enviado com sucesso!");
        console.log("Código gerado:", codigo);

    } catch (erro) {
        console.log("Erro ao enviar email:", erro.message);
    }
}

enviarEmail();
