import { LocationsSchema, PeriodSchema } from "@shared/schema/library.schema";
import LibraryModel from "@srcBack/model/LibraryModel";
import { NextFunction, Request, Response } from "express";
import z from "zod";


export const checkPeriodValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const { period } = req.body;
  if (period === undefined || period === null) {
    res.status(400).json({ message: "middleware checkPeriodValid : période manquante", });

    return;
  }

  //validation zod
  const parsePeriod = PeriodSchema.safeParse(period);
  if (!parsePeriod.success) {
    res.status(400).json({
      message: "Middleware checkPeriodValid : Validation de la période échouée",
      errors: z.flattenError(parsePeriod.error).fieldErrors,
    });
    return;
  }


  next();
}

export default checkPeriodValid;