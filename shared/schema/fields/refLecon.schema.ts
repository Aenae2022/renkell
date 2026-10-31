import { z } from "zod";

export const refLeconSchema = z
  .string()
  .trim()
  .max(10, "La référence ne doit pas dépasser 10 caractères.");

export type RefLeconType = z.infer<typeof refLeconSchema>;