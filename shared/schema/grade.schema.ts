



import { z } from "zod";
import { EntierPositifSchema } from "./fields/entierPositif.schema";
import { StringNameGroupSchema } from "./fields/stringNameGroup.schema";

export const GradeSchema = z.object({
  gradeId: EntierPositifSchema,
  gradeName: StringNameGroupSchema
});
           