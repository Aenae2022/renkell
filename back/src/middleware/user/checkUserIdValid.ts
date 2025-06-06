import UserModel from "@srcBack/model/UserModel";
import { Request, Response, NextFunction } from "express";

export function checkUserIdValid() {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Non authentifié." });
      return;
    }

    const userValid = await UserModel.doesUserIdExist(user.userId);
    if(!userValid){
      res.status(400).json({ message: "Utilisateur introuvable." });
      return;
    }


    next(); // continuer si tout est OK
  };
}