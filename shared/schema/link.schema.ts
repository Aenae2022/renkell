import { z } from "zod";
import { StringShortRefSchema } from "./fields/stringShortRef.schema";
import { StringNameSchema } from "./fields/stringName.schema";
import {StringNamePictureSchema} from "./fields/stringNamePicture.schema" 
import { EntierPositifSchema } from "./fields/entierPositif.schema";
import { StringNameTitleSchema } from "./fields/stringNameTitle.schema";

export const LinkShortSchema = z.object({
  linkId: EntierPositifSchema,
  linkRedirection: z.string(),
  linkIcon: z.string(),
  linkTitleBr: z.string(),
  linkTitleFr: z.string(),
});



export const LinkDataSchema = z.object(
{
  linkId: EntierPositifSchema,
  linkName: StringShortRefSchema,
  titleFr: StringNameTitleSchema.nullable(),
  titleBr: StringNameTitleSchema.nullable(),
  redirection: z.string().url(),
  icon: StringNamePictureSchema,
  fullnameFr: z.string().nullable(),
  fullnameBr: StringNameTitleSchema.nullable(),
  matter: StringShortRefSchema,
  descriptionFr: z.string().nullable(),
  descriptionBr: z.string().nullable(),
  typeLink: z.enum(["all", "teacher", "student"]),
  isPrivate: z.boolean(),
  isAssociated: z.boolean(),
  totalUsersWithAccess: z.number(),
})

export const LinksDataSchema = z.array(LinkDataSchema);


export type LinkShortType = z.infer<typeof LinkShortSchema>;
export type LinkDataType = z.infer<typeof LinkDataSchema>;

