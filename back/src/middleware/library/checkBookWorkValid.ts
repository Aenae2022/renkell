import { NextFunction, Request, Response } from "express";


export const checkBookWorkValid = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

  const { work } = req.body;
  if (work === undefined) {
    res.status(400).json({ message: "middleware checkBookWorkValid : work vide" });
    return;
  }

  const regexValid = /^[0-1]{1}$/
  const isValid = regexValid.test(work);
  if(!isValid){
    res.status(404).json({ message: "Pas de corrélation userId, groupId" });
    return;
  }
  
    next();
  }

  export default checkBookWorkValid;