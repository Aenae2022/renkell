import { z } from "zod";

export const StringRoleNameSchema = z
  .string()
  .min(1, { message: "Le nom ne peut pas être vide" })
  .max(50, { message: "Le nom est trop long" })
  .regex(
    /^[A-Z_]+$/,
    {
      message:
        "format de role incorrect",
    }
  );
