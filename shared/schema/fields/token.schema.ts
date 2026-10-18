import { z } from "zod";

export const tokenSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]+$/);