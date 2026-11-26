import { NextFunction, Request, Response } from "express";
import LibraryModel from "@srcBack/model/LibraryModel";
import { BookSchema } from "@shared/schema/library.schema";
import z from "zod";

export const checkBookExists = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

  const { book } = req.body;
  if (!book) {
    res.status(400).json({ message: "L'objet book est manquant." });
    return;
  }

  // ✅ Validation avec Zod
  const result = BookSchema.safeParse(book);

  if (!result.success) {
    res.status(400).json({
      message: "Validation du book échouée",
      errors: z.flattenError(result.error).fieldErrors,
    });
    return;
  }

  // 🧼 On travaille maintenant avec les données validées
  const validatedBook = result.data;
  req.body.book = validatedBook;

  const bookGroupIdExists = await LibraryModel.doesBookGroupIdExist(validatedBook.bookGroupId);
    if (!bookGroupIdExists) {
      res.status(404).json({ message: "salle de classe introuvable" });
      return
    }
  
    next();
  }

  export default checkBookExists;