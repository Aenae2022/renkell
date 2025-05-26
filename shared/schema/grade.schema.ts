



import { z } from "zod";
import { StringNameSchema } from "./fields/stringName.schema";

export const GradeSchema = z.object({
  gradeId: z.number(),
  gradeName: StringNameSchema
});
           