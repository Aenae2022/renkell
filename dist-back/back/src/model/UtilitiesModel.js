"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailService_1 = require("@srcBack/services/mailService");
class UtilitiesModel {
    static async newMail(recipient, sender, subject, message) {
        try {
            //on envoie l'email
            const emailSent = await (0, mailService_1.sendEmail)({ recipient, sender, subject, message });
            if (emailSent) {
                return ({ reponse: true, message: "mail envoyé" });
            }
            else {
                return ({ reponse: false, message: "erreur d'envoi du mail" });
            }
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            return ({ reponse: false, message: "erreur serveur" });
        }
    }
}
exports.default = UtilitiesModel;
