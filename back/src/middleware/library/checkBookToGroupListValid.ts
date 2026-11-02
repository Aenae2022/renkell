import { NextFunction, Request, Response } from "express";
import LibraryModel from "@srcBack/model/LibraryModel";
import { BookSchema, BookToGroupListSchema } from "@shared/schema/library.schema";

export const checkBookToGroupListValid = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

  const { book } = req.body;
  if (!book) {
    res.status(400).json({ message: "middleware checkBookToGroupListValid L'objet book est manquant." });
    return;
  }

  
  // ✅ Validation avec Zod
  const result = BookToGroupListSchema.safeParse(book);

  if (!result.success) {
    res.status(400).json({
      message: "middleware checkBookToGroupListValid : Validation du book échouée",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  // 🧼 On travaille maintenant avec les données validées
  const validatedBook = result.data;
  req.body.book = validatedBook;

    next();
  }

  export default checkBookToGroupListValid;