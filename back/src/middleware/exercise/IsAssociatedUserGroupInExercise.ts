import { NextFunction, Request, Response } from "express";
import GroupModel from "@srcBack/model/GroupModel";
import { EntierPositifSchema } from "@shared/schema/fields/entierPositif.schema";


export const IsAssociatedUserGroupInExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const { exerciseAttemptDatas} = req.body;
  if (!exerciseAttemptDatas || exerciseAttemptDatas.userId === null || exerciseAttemptDatas.groupId === null) {
    res.status(400).json({ message: "datas manquantes middleware checkAssociationUserGroupValidExercise" });
    return;
  }
  
  // ✅ Validation avec Zod
  const resultGroup = EntierPositifSchema.safeParse(exerciseAttemptDatas.groupId);
  const resultUser = EntierPositifSchema.safeParse(exerciseAttemptDatas.userId);
  if (!resultGroup.success) {
    res.status(400).json({
      message: "Validation du group échouée",
      errors: resultGroup.error.flatten().fieldErrors,
    });
    return;
  }

  if (!resultUser.success) {
    res.status(400).json({
      message: "Validation de l'utilisateur échouée",
      errors: resultUser.error.flatten().fieldErrors,
    });
    return;
  }

  // 🧼 On travaille maintenant avec les données validées
  const validatedGroupId = resultGroup.data;
  const validatedUserId = resultUser.data;

  try {
    const groupUserExists = await GroupModel.doesAssociationUserGroupExist(validatedUserId, validatedGroupId);
    if (!groupUserExists) {
      res.status(404).json({ message: "Association utilisateur-groupe introuvable" });
      return
    }

    next();
  } catch (error) {
    console.error("checkAssociationUserGroupValid")
    console.error(error);
    res.status(500).json({
      message: "Erreur interne du serveur."
    });
    return;
  }
}

export default IsAssociatedUserGroupInExercise;