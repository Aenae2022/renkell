import { z } from "zod";

export const StringNameTitleSchema = z
  .string()
  .trim()
  .min(1, { message: "Le titre ne peut pas être vide" })
  .max(100, { message: "Le titre est trop long" })
  .regex(
    /^[\p{L}0-9'’\-–°,%:@\.!\?()\/ ]+$/u,
    {
      message:
        "Le titre ne peut contenir que des lettres, espaces, chiffres, apostrophes, tirets ou ponctuation simple (/:, . ! ? °).",
    }
  );

  export type StringNameTitleType = z.infer<typeof StringNameTitleSchema>;