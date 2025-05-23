import { z } from "zod";
import { StringShortRefSchema } from "./fields/stringShortRef.schema";

export const SchoolRefSchema = StringShortRefSchema

export const SchoolSchema = z.object({
  schoolId: z.number().int(),
  schoolName: z.string().min(1, "Nom de l'école requis"),
  schoolRef: SchoolRefSchema,
});


// Type TypeScript associé
export type SchoolType = z.infer<typeof SchoolSchema>;
export type SchoolRefType = z.infer<typeof StringShortRefSchema>;