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

export const GroupInfoSchema = z.object({
  groupId: z.number(),
  groupName : StringNameGroupSchema, 
  principal : z.boolean(),
})

export const GroupPrincipalInfoSchema = z.object({
  groupId: z.number(),
  groupName : StringNameGroupSchema, 
  principal : z.literal(true),
})

export const GroupSecondaireInfoSchema = z.object({
  groupId: z.number(),
  groupName : StringNameGroupSchema, 
  principal : z.literal(false),
})

export type GroupLinksType = z.infer<typeof GroupLinksSchema>;
export type GroupInfoType = z.infer<typeof GroupInfoSchema>
export type GroupNameType = z.infer<typeof StringNameGroupSchema>

