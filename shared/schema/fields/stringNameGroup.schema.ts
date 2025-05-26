import { z } from "zod";

export const StringNameGroupSchema = z
  .string()
  .trim()
  .min(1, { message: "Le nom ne peut pas être vide" })
  .max(50, { message: "Le nom est trop long" })
  .regex(
    /^[A-Za-zÀ-ÖØ-öø-ÿ0-9'’\- ]+$/,
    {
      message:
        "Le nom ne peut contenir que des lettres, espaces, chiffres, , apostrophes ou tirets.",
    }
  );
