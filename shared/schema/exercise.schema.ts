import { z } from "zod";
import { EntierPositifSchema } from "./fields/entierPositif.schema";

export const JbdbItemSchema = z.object({
  question: z.string(),
  resultats: z.array(
    z.object({
      texte: z.string(),
      valeurRep: z.number(),
    })
  ),
  reponses: z.array(z.array(z.union([
    z.string(),
    z.number()
  ]))),
  indexCalcul: z.number(),
  validation: z.boolean(),
});

export const JbdbExerciseAttemptSchema = z.object({
  userId: EntierPositifSchema,
  groupId: EntierPositifSchema,
  groupName: z.string(),
  exId: z.string(),
  completedAt: z.coerce.date(),
  durationSeconds: EntierPositifSchema,
  score: EntierPositifSchema,
  seuilAcquis: EntierPositifSchema,
  seuilEca: EntierPositifSchema,
  result: z.string(),
  traceData: z.object({
    items: z.array(JbdbItemSchema),
  }),
});

export type JbdbExerciseAttemptType = z.infer<typeof JbdbExerciseAttemptSchema>