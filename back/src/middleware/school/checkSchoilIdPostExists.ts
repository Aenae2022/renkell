import SchoolModel from "@srcBack/model/SchoolModel";
import { Request, Response, NextFunction } from "express";

export const checkSchoolIdPostSpeExists =  async(
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<void>=>{

    const {schoolId} = req.body

    if (schoolId && isNaN(schoolId)) {
      res.status(403).json({ message: "Accès interdit." });
      return;
    }

    if (schoolId) {      
      const schoolIdExists = await SchoolModel.doesSchoolIdExist(schoolId);
      if (!schoolIdExists) {
        res.status(404).json({ message: "école introuvable" });
        return
      }

    }

    next();
  };
