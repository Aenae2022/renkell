import { NextFunction, Request, Response } from "express";
import { UserPseudoSchema } from "@shared/schema/user.schema";
import {PasswordSchema} from "@shared/schema/fields/password.schema";

export const checkInputUserPsswdValid = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void>=>{
    const { userPsswd } = req.body;
    if (!userPsswd) {
    res.status(400).json({ message: "L'objet mot de passe est manquant." });
    return;
  }

  // ✅ Validation avec Zod
  const result = PasswordSchema.safeParse(userPsswd);

  if (!result.success) {
    res.status(400).json({
      message: "le format du mot de passe est invalide",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  // 🧼 On travaille maintenant avec les données validées
  const validatedPsswd = result.data;
  req.body.userPsswd = validatedPsswd;

  
    next();
  }

  export default checkInputUserPsswdValid;