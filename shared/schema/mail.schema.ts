import {z} from "zod";

export const MailSchema = z.object({
  recipient: z.string().email(),
  sender: z.number().int(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export const MailFinishSchema = z.object({
  recipient: z.string().email(),
  sender: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export type MailType = z.infer<typeof MailSchema>;
export type MailFinishType = z.infer<typeof MailFinishSchema>;