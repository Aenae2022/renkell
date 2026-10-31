import { NextFunction, Request, Response } from "express";
import ClassroomModel from "../../model/ClassroomModel";
import { ClassroomRefSchema } from "@shared/schema/classroom.schema";
import { StringNameGroupSchema } from "@shared/schema/fields/stringNameGroup.schema";
import DomaineModel from "@srcBack/model/DomaineModel";

export const checkDomaineExists = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void>=>{
    const { domaine } = req.body;
    if (!domaine) {
    res.status(400).json({ message: "L'objet domaine est manquant." });
    return;
  }

  // ✅ Validation avec Zod
  const result = StringNameGroupSchema.safeParse(domaine);

  if (!result.success) {
    res.status(400).json({
      message: "Validation ZOD du domaine échouée",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  const domaineExists = await DomaineModel.doesDomaineExist(domaine);
    if (!domaineExists) {
      res.status(404).json({ message: "domaine introuvable" });
      return
    }
  
    next();
  }

  export default checkDomaineExists;