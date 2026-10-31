



import { z } from "zod";
import { EntierPositifSchema } from "./fields/entierPositif.schema";
import { StringNameGroupSchema } from "./fields/stringNameGroup.schema";

export const GradeSchema = z.object({
  gradeId: EntierPositifSchema,
  gradeName: StringNameGroupSchema
});

export type GradeType = z.infer<typeof GradeSchema>;


           