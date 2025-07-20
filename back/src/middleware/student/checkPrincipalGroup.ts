import { BooleanSchema } from "@shared/schema/fields/boolean.schema";
import { NextFunction, Request, Response } from "express";

export const checkPrincipalGroup = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void>=>{
    const { principal } = req.body;
    if (!principal) {
    res.status(400).json({ message: "checkPrincipalGroup, donnée manquante" });
    return;
  }

  // ✅ Validation avec Zod
  const result = BooleanSchema.safeParse(principal);

  if (!result.success) {
    res.status(400).json({
      message: "checkPrincipalGroup Validation échouée",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

    next();
  }

  export default checkPrincipalGroup;