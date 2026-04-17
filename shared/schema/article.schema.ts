import { z } from "zod";
import { EntierPositifSchema } from "./fields/entierPositif.schema"
import { StringNameSchema } from "./fields/stringName.schema"


export const ArticleSchema = z.object({
  id: EntierPositifSchema,
  color: StringNameSchema,
  titleKey: z.string(),
  descriptionKey: z.string(),
  logoSrc: z.string().url(),
  logoAlt: z.string(),
  languages: z.array(z.string()),
  createdAt: z.string().datetime(),
  links: z.array(
    z.object({
      index: z.number(),
      label: z.string(),
      url: z.string().url(),
    })
  ),
  domaineId: StringNameSchema,
  sousdomaineId: StringNameSchema,
  group: z.object({
    groupName: z.string(),
  }).nullable(),
  componentKey: z.string().nullable(),
});




// Type TypeScript associé
export type ArticleType = z.infer<typeof ArticleSchema>;