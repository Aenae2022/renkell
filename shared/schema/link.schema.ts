import { z } from "zod";

export const LinkShortSchema = z.object({
  linkId: z.number(),
  linkRedirection: z.string(),
  linkIcon: z.string(),
  linkTitleBr: z.string(),
  linkTitleFr: z.string(),
});

export type LinkShortType = z.infer<typeof LinkShortSchema>;

