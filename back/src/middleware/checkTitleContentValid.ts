import { NextFunction, Request, Response } from "express";
import LibraryModel from "@srcBack/model/LibraryModel";
import { BookSchema } from "@shared/schema/library.schema";
import { StringNameTitleSchema } from "@shared/schema/fields/stringNameTitle.schema";

export const checkTitleContentValid = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

  const { titleContent } = req.body;
  if (!titleContent) {
    res.status(400).json({ message: "erreur middleware checkTitleContentValid" });
    return;
  }

  // ✅ Validation avec Zod
  const result = StringNameTitleSchema.safeParse(titleContent);

  if (!result.success) {
    res.status(400).json({
      message: "middleware checkTitleContentValid : erreur de validation" ,
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  // 🧼 On travaille maintenant avec les données validées
  const validatedTitle = result.data;
  req.body.titleContent = validatedTitle;

    next();
  }

  export default checkTitleContentValid;