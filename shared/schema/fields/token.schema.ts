import { z } from "zod";

export const tokenSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]+$/);

export const tokenClairSchema = z.string().length(64).regex(/^[a-f0-9]{64}$/i)

export type tokenClairType = z.infer<typeof tokenClairSchema>