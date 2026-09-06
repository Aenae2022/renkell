import UserModel from "@srcBack/model/UserModel";
import { Request, Response, NextFunction } from "express";

export const checkGetBooksToBorrow = async(req: Request, res: Response, next: NextFunction) =>{
    const { groupId, userId, waiting } = req.body;
    if (!groupId || groupId === 0 || !userId || userId === 0 || typeof waiting !== "boolean") {
      return res.status(400).json({ message: "Les données ne sont pas valides : groupId, userId, waiting" });
    }

    //vérification des format de données
    const groupIdValid = Number.isInteger(groupId) && groupId > 0;
    const userIdValid = Number.isInteger(userId) && userId > 0; 
    if (!groupIdValid || !userIdValid) {
      return res.status(400).json({ message: "Les données ne sont pas valides : groupId, userId" });
    }
    const groupUserValid = await UserModel.doesUserIdExistInGroupId(userId, groupId);
    if (!groupUserValid) {
      return res.status(404).json({ message: "Pas de corrélation userId, groupId" });
    }
  
    next();
  }

  export default checkGetBooksToBorrow;