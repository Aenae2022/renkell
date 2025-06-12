import { z } from "zod";
import { StringShortRefSchema } from "./fields/stringShortRef.schema";
import { StringNameSchema } from "./fields/stringName.schema";
import {StringNamePictureSchema} from "./fields/stringNamePicture.schema" 

export const LinkShortSchema = z.object({
  linkId: z.number(),
  linkRedirection: z.string(),
  linkIcon: z.string(),
  linkTitleBr: z.string(),
  linkTitleFr: z.string(),
});



export const LinkDataSchema = z.object(
{
  linkId: z.number(),
  linkName: StringShortRefSchema,
  titleFr: StringNameSchema.nullable(),
  titleBr: StringNameSchema.nullable(),
  redirection: z.string().url(),
  icon: StringNamePictureSchema,
  fullnameFr: z.string().nullable(),
  fullnameBr: StringNameSchema.nullable(),
  matter: StringShortRefSchema,
  descriptionFr: z.string().nullable(),
  descriptionBr: StringNameSchema.nullable(),
  typeLink: z.enum(["all", "teacher", "student"]),
  isPrivate: z.boolean(),
  isAssociated: z.boolean(),
  totalUsersWithAccess: z.number(),
})

export const LinksDataSchema = z.array(LinkDataSchema);


export type LinkShortType = z.infer<typeof LinkShortSchema>;
export type LinkDataType = z.infer<typeof LinkDataSchema>;

