import UserModel from "@srcBack/model/UserModel";
import { sendEmail } from "@srcBack/services/mailService";

export default class UtilitiesModel {

    static async newMail (recipient: string, sender: string, subject: string, message: string) {
        
        try {
         
          //on envoie l'email
          const emailSent = await sendEmail({recipient, sender, subject, message});
        
            if (emailSent) {
                return({reponse :true, message : "mail envoyé"});
            } else {
                return({reponse :false, message : "erreur d'envoi du mail"});
            }
        } catch (error) {
          console.error("Erreur dans le contrôleur :", error);
          return({reponse :false, message : "erreur serveur"});
        }
      }
    }

    