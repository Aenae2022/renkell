



import { z } from "zod";
import { StringNameSchema } from "./fields/stringName.schema";
import { EntierPositifSchema } from "./fields/entierPositif.schema";

export const GradeSchema = z.object({
  gradeId: EntierPositifSchema,
  gradeName: StringNameSchema
});
           