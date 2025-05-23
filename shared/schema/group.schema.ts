import { z } from "zod";
import { LinkShortSchema } from "./link.schema";

export const GroupLinkSchema = z.object({
  link: LinkShortSchema,
});

export const GroupLinksSchema = z.object({
  groupId: z.string().or(z.number()),
  groupName: z.string(),
  groupLinks: z.array(GroupLinkSchema),
});

export type GroupLinksSchema = z.infer<typeof GroupLinksSchema>;
