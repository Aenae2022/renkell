import { EntierPositifSchema } from "@shared/schema/fields/entierPositif.schema";
import GradeModel from "@srcBack/model/GradeModel";
import { Request, Response, NextFunction } from "express";

export const checkGradePostValid = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void> => {
    const {gradeId} = req.body;

    if (!gradeId) {
      res.status(401).json({ message: "gradeId manquant" });
      return;
    }

    const parsedRole = EntierPositifSchema.safeParse(gradeId);
    if (!parsedRole.success) {
      res.status(400).json({ message: "gradeId invalide." });
      return;
    }

    const gradeValid = await GradeModel.doesGradeIdExist(gradeId);
    if (!gradeValid) {
      res.status(400).json({ message: "gradeId inexistant." });
      return;
    }

    next(); // continuer si tout est OK
  };
export default checkGradePostValid
