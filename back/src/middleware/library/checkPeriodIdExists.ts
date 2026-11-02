import { EntierPositifSchema } from "@shared/schema/fields/entierPositif.schema";
import LibraryModel from "@srcBack/model/LibraryModel";
import { NextFunction, Request, Response } from "express";


export const checkPeriodIdExistsValid = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

  const { periodId } = req.body;
  if (periodId === undefined || periodId === null) {
    res.status(400).json({ message: "middleware checkPeriodLocationsValid : période manquante", });
    
    return;
  }
  //validation zod
  const parsePeriodId = EntierPositifSchema.safeParse(periodId);
  if (!parsePeriodId.success) {
    res.status(400).json({
      message: "Middleware checkPeriodIdExists : Validation de la période échouée",
      errors: parsePeriodId.error.flatten().fieldErrors,
    });
    return;
  }

  const periodIdValid = await LibraryModel.doesPeriodExist(periodId);
  if (!periodIdValid) {
    res.status(400).json({
      message: "Middleware checkPeriodIdExists : Pas de période correspondante en bd",
    });
    return;
}
    next();
  }

  export default checkPeriodIdExistsValid;