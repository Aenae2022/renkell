import { NextFunction, Request, Response } from "express";
import SchoolModel from "../../model/SchoolModel";
import { SchoolSchema } from "@shared/schema/school.schema";

export const checkSchoolValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { school } = req.body;
  // 🔒 Vérifie si school est bien présent
  if (!school) {
    res.status(400).json({ message: "L'objet school est manquant." });
    return;
  }

  // ✅ Validation avec Zod
  const result = SchoolSchema.safeParse(school);

  if (!result.success) {
    res.status(400).json({
      message: "Validation de l'école échouée",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  // 🧼 On travaille maintenant avec les données validées
  const validatedSchool = result.data;
  req.body.school = validatedSchool;

  // ✅ Cas particulier : schoolId === 0 ⇒ passer au next sans vérifier schoolRef
  if (validatedSchool.schoolId === 0) {
    return next();
  }

  // ✅ Vérifie si l'école existe en base
  const schoolRefExists = await SchoolModel.doesSchoolRefExist(validatedSchool.schoolRef);
  if (!schoolRefExists) {
    res.status(404).json({ message: "École introuvable" });
    return;
  }

  // 🔁 Passe à la suite
  return next();
};

export default checkSchoolValid;
