import { NextFunction, Request, Response } from "express";
import LibraryModel from "@srcBack/model/LibraryModel";
import { EntierPositifSchema } from "@shared/schema/fields/entierPositif.schema";

export const checkBookGroupIdExists = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

  const { bookGroupId } = req.body;
  if (!bookGroupId) {
    res.status(400).json({ message: "le groupBookId est manquant." });
    return;
  }

  // ✅ Validation avec Zod
  const result = EntierPositifSchema.safeParse(bookGroupId);

  if (!result.success) {
    res.status(400).json({
      message: "Validation du bookGroupId échouée",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  // 🧼 On travaille maintenant avec les données validées
  const validatedBookGroupId = result.data;
  req.body.book = validatedBookGroupId;

  const bookGroupIdExists = await LibraryModel.doesBookGroupIdExist(validatedBookGroupId);
    if (!bookGroupIdExists) {
      res.status(404).json({ message: "sbookGroupId introuvable" });
      return
    }
  
    next();
  }

  export default checkBookGroupIdExists;