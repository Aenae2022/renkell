import { NextFunction, Request, Response } from "express";
import UserModel from "../../model/UserModel";
import { UserPseudoSchema } from "@shared/schema/user.schema";

export const checkUserPseudoExists = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void>=>{
    const { userPseudo } = req.body;
    if (!userPseudo) {
    res.status(400).json({ message: "L'objet pseudo est manquant." });
    return;
  }

  // ✅ Validation avec Zod
  const result = UserPseudoSchema.safeParse(userPseudo);

  if (!result.success) {
    res.status(400).json({
      message: "Validation de l'utilisateur échouée",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  // 🧼 On travaille maintenant avec les données validées
  const validatedUserPseudo = result.data;
  req.body.userPseudo = validatedUserPseudo;

  
    const userPseudoExists = await UserModel.doesUserPseudoExist(validatedUserPseudo);
    if (!userPseudoExists) {
      res.status(404).json({ message: "utilisateur introuvable" });
      return
    }
  
    next();
  }

  export default checkUserPseudoExists;