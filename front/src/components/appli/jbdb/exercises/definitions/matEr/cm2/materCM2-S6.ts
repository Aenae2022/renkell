import type { JbdbExerciseType } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createMaterCM2S6Exercise = (): JbdbExerciseType => {
  return {
      exId: `jbdb-matercm2-0601`,
      translationId: `jbdb-matercm2-0601`,
      description: "Liesaat daou niver",
      shortTitle: `S1`,
      exampleQuestion: "32 x 21 = (32x20) + (32x1) = 640 + 32 = 672",
      logo: "exercice/calcul/multiplier.png",
      duration: 180,
      exerciseNumber: 10,
      objectif: 50, //objectif visé (ration temps/nb réponses attendu)
      eca: 20, //score en dessous du quel on indique le résultat en rouge
      calculAGenerer()
      : {
        question: string;
        resultats: { texte: string; valeurRep: number }[];
        solutionsAlternatives?: number[][];
      } {
          const nb1max = 49;
          const nb1min = 12;
          const nb2max = 29;
          const nb2min = 12;
          
          const {question, resultats, solutionsAlternatives} = JbdbUtils.multiduxdu(nb1max, nb1min, nb2max, nb2min);
          return { question, resultats, solutionsAlternatives };
      },
    }
};

export const materCM2S6Exercises: JbdbExerciseType[] = Array.from({ length: 1 }, (_,  ) => createMaterCM2S6Exercise());

 

export const materCM2S6ExerciseIds =
  materCM2S6Exercises.map((exercise) => exercise.exId);

