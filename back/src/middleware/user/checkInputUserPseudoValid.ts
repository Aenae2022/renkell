import { NextFunction, Request, Response } from "express";
import { UserPseudoSchema } from "@shared/schema/user.schema";

export const checkInputUserPseudoValid = async(
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
      message: "le format du pseudo est invalide",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  // 🧼 On travaille maintenant avec les données validées
  const validatedUserPseudo = result.data;
  req.body.userPseudo = validatedUserPseudo;

  
    next();
  }

  export default checkInputUserPseudoValid;