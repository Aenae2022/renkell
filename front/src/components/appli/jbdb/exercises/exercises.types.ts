import { type EntierPositifType } from "@shared/schema/fields/entierPositif.schema";

export type JbdbExerciseResult = {
  texte: string;
  valeurRep: number;
};

export type JbdbGeneratedQuestion = {
  question: string;
  resultats: JbdbExerciseResult[];
};

export type JbdbExerciseType = {
  exId: string;
  translationId: string;
  description: string;
  shortTitle: string;
  exampleQuestion: string;
  logo: string;
  duration: number;
  exerciseNumber: number;
  objectif: number;
  eca: number;

  calculAGenerer: () => JbdbGeneratedQuestion;
};

export type JbdbExerciseAttemptDataType = {
  userId: EntierPositifType;
  groupId: EntierPositifType;
  groupName: string;
  exId: string;
  completedAt: Date;
  durationSeconds: EntierPositifType;
  score: EntierPositifType;
  seuilAcquis: EntierPositifType;
  seuilEca: EntierPositifType;
  result: string;
  traceData: {
    items: JbdbItemType[];
  };
}

export type JbdbItemType = {
      question: string;
      resultats: { texte: string; valeurRep: number }[];
      reponses: (string | number)[][];
      indexCalcul: number;
      validation: boolean;
    }