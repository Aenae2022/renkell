import { z } from "zod";


export const TypeCTSchema = z.enum(["c", "t"])
export const TypeUserDatasSchema = z.enum(["student", "teacher", "admin", "invit"]);

// Type TypeScript associé
export type TypeCTType = z.infer<typeof TypeCTSchema>;
