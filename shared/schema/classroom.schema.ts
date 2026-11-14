import { z } from "zod";
import { StringShortRefSchema } from "./fields/stringShortRef.schema";
import { ColorHexaSchema } from "./fields/colorHexa.schema";
import { GroupLinksSchema} from "./group.schema";
import { EntierPositifSchema } from "./fields/entierPositif.schema";



export const ClassroomRefSchema = StringShortRefSchema;

export const ClassroomSchema = z.object({
  classroomId: EntierPositifSchema,
  classroomNumber: z.number(),
  classroomOrder: z.number(),
  classroomBackgroundColor: ColorHexaSchema,
  classroomBorderColor: ColorHexaSchema,
  classroomColor: ColorHexaSchema,
  classroomRef: ClassroomRefSchema,
  group: z.object({
    groupName: z.string(),
  }).nullable(),
});

export const ClassroomShortSchema = z.object({
  classroomId: EntierPositifSchema,
  classroomNumber: EntierPositifSchema,
  classroomBackgroundColor: ColorHexaSchema,
  classroomBorderColor: ColorHexaSchema,
  classroomColor: ColorHexaSchema,
});

export const ClassroomWithLinksSchema = z.object({
    classroomRef: ClassroomRefSchema,
    group : GroupLinksSchema,
  
    })



// Type TypeScript associé
export type ClassroomRefType = z.infer<typeof StringShortRefSchema>;
export type ClassroomType = z.infer<typeof ClassroomSchema>;
export type classroomColorType = z.infer<typeof ColorHexaSchema>;
export type ClassroomWithLinksType = z.infer<typeof ClassroomWithLinksSchema>;
export type ClassroomShortType = z.infer<typeof ClassroomShortSchema>;