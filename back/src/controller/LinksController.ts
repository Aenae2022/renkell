import LinkModel from "@srcBack/model/LinkModel";
import UserModel from "@srcBack/model/UserModel";
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



}

