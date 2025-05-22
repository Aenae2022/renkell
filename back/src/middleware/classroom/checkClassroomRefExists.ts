import { NextFunction, Request, Response } from "express";
import ClassroomModel from "../../model/ClassroomModel";

export const checkClassroomRefExists = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void>=>{
    const { classroomRef } = req.body;
    console.log("Route active")
    if (!classroomRef || classroomRef === "" || classroomRef === null) {
      res.status(400).json({ message: "classroomRef manquant ou invalide", });
      return;
    }
  
    const classroomRefExists = await ClassroomModel.doesClassroomRefExist(classroomRef);
    if (!classroomRefExists) {
      res.status(404).json({ message: "salle de classe introuvable" });
      return
    }
  
    next();
  }

  export default checkClassroomRefExists;