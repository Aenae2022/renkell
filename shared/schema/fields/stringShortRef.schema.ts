import { z } from "zod";

export const StringShortRefSchema = z
  .string()
  .min(1, "Requis")
  .max(50, "Trop long")
  .regex(/^[a-zA-Z0-9-_]+$/, "Format invalide");