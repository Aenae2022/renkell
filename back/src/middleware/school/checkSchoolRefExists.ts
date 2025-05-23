import { NextFunction, Request, Response } from "express";
import SchoolModel from "../../model/SchoolModel";
import { SchoolRefSchema } from "@shared/schema/school.schema"
export const checkSchoolRefExists = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void>=>{
    const { schoolRef } = req.body;
    // 🔒 Vérifie si classroomRef est bien présent
      if (!schoolRef) {
        res.status(400).json({ message: "L'objet classroomRef est manquant." });
        return;
      }
    
      // ✅ Validation avec Zod
      const result = SchoolRefSchema.safeParse(schoolRef);
    
      if (!result.success) {
        res.status(400).json({
          message: "Validation de l'école échouée",
          errors: result.error.flatten().fieldErrors,
        });
        return;
      }
    
      // 🧼 On travaille maintenant avec les données validées
      const validatedSchoolRef = result.data;
      req.body.classroomRef = validatedSchoolRef;
    
    const schoolRefExists = await SchoolModel.doesSchoolRefExist(validatedSchoolRef);
    if (!schoolRefExists) {
      res.status(404).json({ message: "école introuvable" });
      return
    }
  
    next();
  }

  export default checkSchoolRefExists;