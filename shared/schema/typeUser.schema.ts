import { z } from "zod";


export const TypeCTSchema = z.enum(["c", "t"])

// Type TypeScript associé
export type TypeCTType = z.infer<typeof TypeCTSchema>;
