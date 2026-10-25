import { NextFunction, Request, Response } from "express";
import ClassroomModel from "../../model/ClassroomModel";
import { EntierPositifSchema } from "@shared/schema/fields/entierPositif.schema";

export const checkClassroomIdPostExists = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void>=>{
    const { classroomId } = req.body;
    if (!classroomId) {
    res.status(400).json({ message: "L'objet classroomId est manquant." });
    return;
  }

  // ✅ Validation avec Zod
  const result = EntierPositifSchema.safeParse(classroomId);

  if (!result.success) {
    res.status(400).json({
      message: "Validation de la salle de classe échouée",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }


  const validatedClassroomId = result.data;
  req.body.classroomRef = validatedClassroomId;

  
    const classroomIdExists = await ClassroomModel.doesClassroomIdExist(validatedClassroomId);
    if (!classroomIdExists) {
      res.status(404).json({ message: "salle de classe introuvable" });
      return
    }
  
    next();
  }

  export default checkClassroomIdPostExists;