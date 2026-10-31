import { NextFunction, Request, Response } from "express";


export const checkIsbn = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

  const { isbnContent } = req.body;
  if (isbnContent === undefined) {
    res.status(400).json({ message: "middleware checkIsbn : isbn vide" });
    return;
  }

  const regexValidISBN = /^[0-9]{13}$/
  const isValidIsbn = regexValidISBN.test(isbnContent);
  if(!isValidIsbn){
    req.body.isbnContent = 0 ;
  }
  
    next();
  }

  export default checkIsbn;