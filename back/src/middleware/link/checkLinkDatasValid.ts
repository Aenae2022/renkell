import { ExerciseLinkDatasSchema } from "@shared/schema/link.schema";
import { Request, Response, NextFunction } from "express";

export const checkLinkDatasValid = () => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { linkDatas } = req.body;
    if (!linkDatas) {
      res.status(400).json({ message: "Données de lien absentes. middleware checkLinkDatasValid" });
      return;
    }

    const validatedLinkDatas = ExerciseLinkDatasSchema.safeParse(linkDatas);

    if (!validatedLinkDatas.success) {
      res.status(400).json({
        message: "Données de lien invalides. middleware checkLinkDatasValid",
      })
      return;
    }
    req.body.linkDatas = validatedLinkDatas.data; // Remplace les données de lien par les données validées    
    next(); // continuer si tout est OK
  };
}
