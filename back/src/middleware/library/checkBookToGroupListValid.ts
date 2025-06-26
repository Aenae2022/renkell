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
    res.status(400).json({ message: "middleware checkBookToGroupListExistsL'objet book est manquant." });
    return;
  }

  // ✅ Validation avec Zod
  const result = BookSchema.safeParse(BookToGroupListSchema);

  if (!result.success) {
    res.status(400).json({
      message: "middleware checkBookToGroupListExists : Validation du book échouée",
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