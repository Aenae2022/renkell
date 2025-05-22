import { NextFunction, Request, Response } from "express";
import SchoolModel from "../../model/SchoolModel";

export const checkSchoolRefExists = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void>=>{
    const { schoolRef } = req.body;
    if (!schoolRef || schoolRef === "" || schoolRef === null) {
      res.status(400).json({ message: "schoolRef manquant ou invalide", });
      return;
    }
  
    const schoolRefExists = await SchoolModel.doesSchoolRefExist(schoolRef);
    if (!schoolRefExists) {
      res.status(404).json({ message: "école introuvable" });
      return
    }
  
    next();
  }

  export default checkSchoolRefExists;