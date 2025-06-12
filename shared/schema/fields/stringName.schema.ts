import { z } from "zod";

export const StringNameSchema = z
  .string()
  .trim()
  .min(1, { message: "Le nom ne peut pas être vide" })
  .max(50, { message: "Le nom est trop long" })
  .regex(
    /^[\p{L}A-Za-z'’\-@ ]+$/u,
    {
      message:
        "Le nom ne peut contenir que des lettres, espaces, apostrophes ou tirets.",
    }
  );
