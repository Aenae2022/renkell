import { Request, Response } from "express";
import SchoolModel from "../model/SchoolModel";
import ClassroomModel from "../model/ClassroomModel";

export class DegemerController {
  
    static async getClassroomsList(
    req: Request,
    res: Response) {
        const { schoolRef } = req.body;
    
    try {
        const classroomsList = await SchoolModel.getClassroomsListByRef(schoolRef);
        if (classroomsList.reponse === null) {
           res.status(400).json({ message: classroomsList.message, reponse: null, result: [] });
           return
        }
  
         res.status(200).json({ message: classroomsList.message, reponse: classroomsList.reponse, result: classroomsList.result});
        return
      } catch (error) {
        console.error("Erreur dans le contrôleur :", error);
         res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
         return
      }
    }

    static async getClassroomLinksList(
    req: Request,
    res: Response) {
        const { classroomRef } = req.body;
    
    try {
        const linksList = await ClassroomModel.getClassroomLinksListByRef(classroomRef);
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
export default DegemerController;
