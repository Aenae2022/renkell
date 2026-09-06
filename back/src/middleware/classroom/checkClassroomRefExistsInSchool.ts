import { NextFunction, Request, Response } from "express";
import ClassroomModel from "../../model/ClassroomModel";
import { ClassroomRefSchema } from "@shared/schema/classroom.schema";
export const checkClassroomRefExists = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void>=>{
    const { classroomRef, school } = req.body;
    // 🔒 Vérifie si classroomRef est bien présent
  if (!classroomRef) {
    res.status(400).json({ message: "L'objet classroomRef est manquant." });
    return;
  }

  // ✅ Validation avec Zod
  const result = ClassroomRefSchema.safeParse(classroomRef);

  if (!result.success) {
    res.status(400).json({
      message: "Validation de la salle de classe échouée",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  // 🧼 On travaille maintenant avec les données validées
  const validatedClassroomRef = result.data;
  req.body.classroomRef = validatedClassroomRef;

  const schoolId = school.schoolId === 0 ? null : school.schoolId;

    const classroomRefExists = await ClassroomModel.doesClassroomRefExistInSchool(classroomRef, schoolId);
    if (!classroomRefExists) {
      res.status(404).json({ message: "salle de classe introuvable" });
      return
    }
  
    next();
  }

  export default checkClassroomRefExists;