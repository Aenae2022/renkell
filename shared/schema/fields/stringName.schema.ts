import { z } from "zod";

export const StringNameSchema = z
  .string()
  .trim()
  .min(2, { message: "Le nom ne peut pas être vide" })
  .max(60, { message: "Le nom est trop long" })
  .regex(
    /^[\p{L}A-Za-z0-9'’\-. ]*$/u,
    {
      message:
        "Le nom ne peut contenir que des lettres, des chiffres, espaces, apostrophes ou tirets.",
    }
  );

export type StringNameType = z.infer<typeof StringNameSchema>;


