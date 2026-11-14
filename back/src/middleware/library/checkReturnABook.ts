import { Request, Response, NextFunction } from "express";

export const checkReturnABook = async(req: Request, res: Response, next: NextFunction) =>{
    const { isReaded } = req.body;
    if (typeof isReaded !== "boolean") {
      res.status(400).json({ message: "Les données ne sont pas valides : groupId, userId, waiting" });
      return;
    }
    next();
  }

  export default checkReturnABook;