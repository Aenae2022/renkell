import { z } from "zod";
import { StringShortRefSchema } from "./fields/stringShortRef.schema";
import { ColorHexaSchema } from "./fields/colorHexa.schema";
import { GroupLinksSchema} from "./group.schema";


export const ClassroomRefSchema = StringShortRefSchema;

export const ClassroomSchema = z.object({
  classroomId: z.number(),
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

export const ClassroomWithLinksSchema = z.object({
    classroomRef: ClassroomRefSchema,
    group : GroupLinksSchema,
      
    })

// Type TypeScript associé
export type ClassroomRefType = z.infer<typeof StringShortRefSchema>;
export type ClassroomType = z.infer<typeof ClassroomSchema>;
export type classroomColorType = z.infer<typeof ColorHexaSchema>;
export type ClassroomWithLinksType = z.infer<typeof ClassroomWithLinksSchema>;