import { z } from "zod";

export const EntierPositifSchema = z.number().int().min(0);
export type EntierPositifType = z.infer<typeof EntierPositifSchema>;