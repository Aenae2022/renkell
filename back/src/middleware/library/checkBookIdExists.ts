import { NextFunction, Request, Response } from "express";
import LibraryModel from "@srcBack/model/LibraryModel";
import { EntierPositifSchema } from "@shared/schema/fields/entierPositif.schema";
import z from "zod";

export const checkBookIdExists = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

  const { bookId } = req.body;
  if (!bookId) {
    res.status(400).json({ message: "middleware checkBookIdExists : le groupBookId est manquant." });
    return;
  }

  // ✅ Validation avec Zod
  const result = EntierPositifSchema.safeParse(bookId);

  if (!result.success) {
    res.status(400).json({
      message: "middleware checkBookIdExists : Validation zod du bookId échouée",
      errors: z.flattenError(result.error).fieldErrors,
    });
    return;
  }

  // 🧼 On travaille maintenant avec les données validées
  const validatedbookId = result.data;
  req.body.book = validatedbookId;

  const bookIdExists = await LibraryModel.doesBookIdExist(validatedbookId);
    if (!bookIdExists) {
      res.status(404).json({ message: "middleware checkBookIdExists : bookId introuvable" });
      return
    }
  
    next();
  }

  export default checkBookIdExists;