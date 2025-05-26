import { z } from "zod";
import { LinkShortSchema } from "./link.schema";
import { StringNameGroupSchema } from "./fields/stringNameGroup.schema";

export const GroupLinkSchema = z.object({
  link: LinkShortSchema,
});

export const GroupLinksSchema = z.object({
  groupId: z.string().or(z.number()),
  groupName: StringNameGroupSchema,
  groupLinks: z.array(GroupLinkSchema),
});

export const groupInfoSchema = z.object({
  groupId: z.number(),
  groupName : StringNameGroupSchema, 
  principal : z.boolean(),
})

export const groupPrincipalInfoSchema = z.object({
  groupId: z.number(),
  groupName : StringNameGroupSchema, 
  principal : z.literal(true),
})

export const groupSecondaireInfoSchema = z.object({
  groupId: z.number(),
  groupName : StringNameGroupSchema, 
  principal : z.literal(false),
})

export type GroupLinksSchema = z.infer<typeof GroupLinksSchema>;
