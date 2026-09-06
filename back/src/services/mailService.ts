import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";
import { MailFinishType} from "@shared/schema/mail.schema";
dotenv.config();



export const sendEmail = async({recipient, sender, subject, message} : MailFinishType)  => {
    try {
      const transporter = nodemailer.createTransport(
      {
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // Pour SSL
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        connectionTimeout: 10000,
      } satisfies SMTPTransport.Options // 👈 cette ligne est clé
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
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        return false;
    }
};
// module.exports = sendEmail;