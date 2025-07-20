import { NextFunction, Request, Response } from "express";
import GroupModel from "@srcBack/model/GroupModel";
import { EntierPositifSchema } from "@shared/schema/fields/entierPositif.schema";

export const checkGroupIdPostExists = async(
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<void>=>{

  const { groupId } = req.body;
  if (!groupId) {
    res.status(400).json({ message: "L'objet groupId est manquant." });
    return;
  }

  // ✅ Validation avec Zod
  const result =EntierPositifSchema.safeParse(groupId);

  if (!result.success) {
    res.status(400).json({
      message: "Validation du group échouée",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  // 🧼 On travaille maintenant avec les données validées
  const validatedGroupId = result.data;
  req.body.groupId = validatedGroupId;

  const groupIdExists = await GroupModel.doesGroupIdExist(validatedGroupId);
    if (!groupIdExists) {
      res.status(404).json({ message: "salle de classe introuvable" });
      return
    }
  
    next();
  }

  export default checkGroupIdPostExists;