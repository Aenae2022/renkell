import { z } from "zod";
import { StringShortRefSchema } from "./fields/stringShortRef.schema";
import { ClassroomSchema } from "./classroom.schema";

export const SchoolRefSchema = StringShortRefSchema

export const SchoolSchema = z.object({
  schoolId: z.number().int(),
  schoolName: z.string().min(1, "Nom de l'école requis"),
  schoolRef: SchoolRefSchema,
});

export const SchoolWithClassroomsSchema = SchoolSchema.extend({
  classrooms: z.array(ClassroomSchema)
})
// Type TypeScript associé
export type SchoolType = z.infer<typeof SchoolSchema>;
export type SchoolRefType = z.infer<typeof StringShortRefSchema>;
export type SchoolWithClassroomsType = z.infer<typeof SchoolWithClassroomsSchema>;