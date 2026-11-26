import { StringNameSchema } from "@shared/schema/fields/stringName.schema";
import { Request, Response, NextFunction } from "express";

export const checkLinkExIdValid = () => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { exId } = req.body;
    if (!exId) {
      res.status(400).json({ message: "Données de lien absentes. middleware checkLinkDatasValid" });
      return;
    }

    const validatedExId = StringNameSchema.safeParse(exId);

if (!validatedExId.success) {
  res.status(400).json({
    message: "identifiant exercice invalide.",
    details: validatedExId.error.issues,
  });
  return;
}

    req.body.exId = validatedExId.data; // Remplace les données de lien par les données validées    
    next(); // continuer si tout est OK
  };
}
