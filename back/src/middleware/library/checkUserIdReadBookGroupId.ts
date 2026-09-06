import { NextFunction, Request, Response } from "express";
import LibraryModel from "@srcBack/model/LibraryModel";

export const checkUserIdReadBookGroupId = async(req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { userId, bookGroupId } = req.body;
    if (!bookGroupId || bookGroupId === 0 || !userId || userId === 0) {
      res.status(400).json({ message: "Les données ne sont pas valides : userId, bookGroupId" });
      return;
    }
  
    const dataValid = await LibraryModel.doesUserIdReadBookGroupId(userId, bookGroupId);
    if (!dataValid) {
      res.status(404).json({ message: "Pas de corrélation userId, bookGroupId" });
      return
    }
  
    next();
  }

  export default checkUserIdReadBookGroupId;