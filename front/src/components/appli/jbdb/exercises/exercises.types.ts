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

