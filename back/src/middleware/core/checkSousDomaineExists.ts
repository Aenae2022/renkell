import { NextFunction, Request, Response } from "express";
import { StringNameGroupSchema } from "@shared/schema/fields/stringNameGroup.schema";
import SousDomaineModel from "@srcBack/model/SousDomaineModel";

export const checkSousDomaineExists = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void>=>{
    const { sousDomaine } = req.body;
    if (!sousDomaine) {
    res.status(400).json({ message: "L'objet sous-domaine est manquant." });
    return;
  }

  // ✅ Validation avec Zod
  const result = StringNameGroupSchema.safeParse(sousDomaine);

  if (!result.success) {
    res.status(400).json({
      message: "Validation ZOD du sous-domaine échouée",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  const sousDomaineExists = await SousDomaineModel.doesSousDomaineExist(sousDomaine);
    if (!sousDomaineExists) {
      res.status(404).json({ message: "sous-domaine introuvable" });
      return
    }
  
    next();
  }

  export default checkSousDomaineExists;