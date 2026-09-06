import { StudentDatasSchema, UserSessionConnectSchema } from "@shared/schema/user.schema";
import UserModel from "@srcBack/model/UserModel";
import { Request, Response, NextFunction } from "express";

export function checkUserIdValid() {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Non authentifié." });
      return;
    }

    const parsedUser = UserSessionConnectSchema.safeParse(user);
    if (!parsedUser.success) {
      res.status(400).json({ message: "Utilisateur invalide." });
      return;
    }

    req.user = parsedUser.data;

    const userValid = await UserModel.doesUserIdExist(user.userId);
    if(!userValid){
      res.status(400).json({ message: "Utilisateur introuvable." });
      return;
    }


    next(); // continuer si tout est OK
  };
}

export const checkUserIdPostValid = () => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.body;
    if (!userId) {
      res.status(401).json({ message: "Non authentifié. middleware checkUserIdPostValid" });
      return;
    }

    const userValid = await UserModel.doesUserIdExist(userId);
    if(!userValid){
      res.status(400).json({ message: "Utilisateur introuvable. middleware checkUserIdPostValid" });
      return;
    }


    next(); // continuer si tout est OK
  };
}

export const checkUserIdPostStudentValid = () => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.body;
    if (!userId) {
      res.status(401).json({ message: "Non authentifié." });
      return;
    }

    const userValid = await UserModel.doesUserIdStudentExist(userId);
    if(!userValid){
      res.status(400).json({ message: "Utilisateur introuvable." });
      return;
    }




    next(); // continuer si tout est OK
  };
}
