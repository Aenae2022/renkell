import { z } from "zod";

export const StringClassNameTailwindSchema = z
  .string()
  .trim()
  .min(1, { message: "Le nom ne peut pas être vide" })
  .regex(
    /^[a-zA-Z0-9\s\-_/:[\]().,%@!#=+'"`$*<>?&{}|\\^~]+$/,
    {
      message:
        "Certaines classes Tailwind sont invalides ou contiennent des caractères non autorisés",
    }
  );
