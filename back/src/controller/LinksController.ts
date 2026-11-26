import LinkModel from "@srcBack/model/LinkModel";
import UserModel from "@srcBack/model/UserModel";
import { sendEmail } from "@srcBack/services/mailService";
import { Request, Response } from "express";

export default class LinksController {

    static async getUserLinksListData(
    req: Request,
    res: Response) {
        const { userId } = req.body;
    
    try {
        const userListDatas = await LinkModel.getTeacherLinksListData(userId);
        if (userListDatas.reponse === null) {
           res.status(400).json({ message: userListDatas.message, reponse: null, result: [] });
           return
        }
  
         res.status(200).json({ message: userListDatas.message, reponse: userListDatas.reponse, result: userListDatas.result});
        return
      } catch (error) {
        console.error("Erreur dans le contrôleur :", error);
         res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
         return
      }
    }

    static async getUserList(
    req: Request,
    res: Response) {
        const { userId, schoolId } = req.body;

    if(!schoolId){
      res.status(200).json({ message: "utilisateur sans école", reponse: true, result: []});
      return    
    }
    
    try {
      const userListDatas = await UserModel.getOthersTeacherList(userId, schoolId);
        if (userListDatas.reponse === null) {
           res.status(400).json({ message: userListDatas.message, reponse: null, result: [] });
           return
        }
        if(userListDatas.result.length === 0) {
          res.status(200).json({ message: "pas d'autre utilisateur", reponse: false, result: []});
          return    
        }    
        
        res.status(200).json({ message: userListDatas.message, reponse: userListDatas.reponse, result: userListDatas.result});
        return
      } catch (error) {
        console.error("Erreur dans le contrôleur :", error);
         res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
         return
      }
    }

    static async globalLinksListByGroupStudent(
    req: Request,
    res: Response) {
        const { userId, groupId } = req.body;
    
    try {
        const groupListDatas = await LinkModel.getGroupLinksListData(userId, groupId);
        if (groupListDatas.reponse === null) {
           res.status(400).json({ message: groupListDatas.message, reponse: null, result: [] });
           return
        }
  
         res.status(200).json({ message: groupListDatas.message, reponse: groupListDatas.reponse, result: groupListDatas.result});
        return
      } catch (error) {
        console.error("Erreur dans le contrôleur :", error);
         res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
         return
      }
    }

  static async linkAssociation (
    req: Request,
    res: Response) {
    
    const { refId, linkId, type, operation  } = req.body;
    
    try {
      const associationWork = await LinkModel.associateLink({refId, linkId, type, operation});
    
      if (!associationWork) {
           res.status(400).json({ message: "error", reponse: null, result: [] });
           return
      }
      res.status(200).json({ message: associationWork.message, reponse: associationWork.reponse});
      return
    } catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
      return
    }
  }

  static async newLinkMail (
    req: Request,
    res: Response) {
    
    try {
      const { recipient, sender, subject, message } = req.body;    
      
      //on récupère l'email de l'utilisateur
      const senderMail = await UserModel.getUserMailById(sender);
      if(!senderMail || senderMail.reponse === null || senderMail.result === "") {
        res.status(400).json({ message: "userParamsLinks.ask.error", reponse: null, result: [] });
        return
      }
       
      //on envoie l'email
      const emailSent = await sendEmail({recipient, sender:senderMail.result, subject, message});
    
        if (emailSent) {
            res.status(200).json({ result : true, message: "userParamsLinks.ask.success" });
        } else {
            res.status(500).json({ result : false, message: "userParamsLinks.ask.error" });
        }
    } catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
      return
    }
  }

}

