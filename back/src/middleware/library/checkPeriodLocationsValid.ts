import { LocationsSchema, PeriodSchema } from "@shared/schema/library.schema";
import LibraryModel from "@srcBack/model/LibraryModel";
import { NextFunction, Request, Response } from "express";


export const checkPeriodLocationsValid = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

  const { period, locations } = req.body;
  if (period === undefined || period === null) {
    res.status(400).json({ message: "middleware checkPeriodLocationsValid : période manquante", });
    
    return;
  }
  if (locations === undefined || locations === null) {
    res.status(400).json({ message: "middleware checkPeriodLocationsValid : locations manquants" });
    return;
  }

  //validation zod
  const parsePeriod = PeriodSchema.safeParse(period);
  if (!parsePeriod.success) {
    res.status(400).json({
      message: "Middleware checkPeriodLocationsValid : Validation de la période échouée",
      errors: parsePeriod.error.flatten().fieldErrors,
    });
    return;
  }

  const periodValid = await LibraryModel.doesPeriodExist(period.periodId);
  if (!periodValid) {
    res.status(400).json({
      message: "Middleware checkPeriodLocationsValid : Pas de période correspondante en bd",
    });
    return;
}

  const parseLocations = LocationsSchema.safeParse(locations);
  if (!parseLocations.success) {
    res.status(400).json({
      message: "Middleware checkPeriodLocationsValid : Validation des locations échouée",
      errors: parseLocations.error.flatten().fieldErrors,
    });
    return;
  }

  
    next();
  }

  export default checkPeriodLocationsValid;