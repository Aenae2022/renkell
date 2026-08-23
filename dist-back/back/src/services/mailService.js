"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendEmail = async ({ recipient, sender, subject, message }) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true, // Pour SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            connectionTimeout: 10000,
        } // 👈 cette ligne est clé
        );
        const mailOptions = {
            from: `"Renkell" <marenkell@marenkell.com>`,
            replyTo: sender,
            to: recipient,
            subject: subject,
            text: message,
        };
        const info = await transporter.sendMail(mailOptions);
        return true;
    }
    catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        return false;
    }
};
exports.sendEmail = sendEmail;
// module.exports = sendEmail;
