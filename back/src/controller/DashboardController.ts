import { Request, Response } from "express";
import SchoolModel from "../model/SchoolModel";
import ClassroomModel from "../model/ClassroomModel";
import UserModel from "../model/UserModel";

export default class DashboardController {
  
    static async getTeacherLinksList(
      req: Request,
      res: Response) {
      try {
        const user = req.user;
        if (!user) {
          res.status(401).json({ message: "Non authentifié." });
          return;
        }
        const linksList = await UserModel.getUserLinksListByUserId(user.userId);
        if (linksList.reponse === null) {
           res.status(400).json({ message: linksList.message, reponse: null, result: [] });
           return
        }
        res.status(200).json({ message: linksList.message, reponse: linksList.reponse, result: linksList.result});
        return
      } catch (error) {
        console.error("Erreur dans le contrôleur :", error);
        res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
        return
      }
    }
    
}
