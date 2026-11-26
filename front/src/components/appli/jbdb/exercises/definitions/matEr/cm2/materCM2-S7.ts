import { Matematik } from "@utils/Matematik";
import type { JbdbExerciseType } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createMaterCM2S7Exercise = (): JbdbExerciseType => {
  return {
      exId: `jbdb-matercm2-0701`,
      translationId: `jbdb-matercm2-0701`,
      description: "taolioù liesaat 2 4 8",
      shortTitle: `S1`,
      exampleQuestion: "4 x ? = 32",
      logo: "exercice/calcul/multiplier.png",
      duration: 180,
      exerciseNumber: 30,
      objectif: 100, //objectif visé (ration temps/nb réponses attendu)
      eca: 40, //score en dessous du quel on indique le résultat en rouge
      calculAGenerer()
      : {
        question: string;
        resultats: { texte: string; valeurRep: number }[];
      } {
          //tables de multiplication avec(2/3) ou sans trou (1/3)
          const nb1max = 9;
          const nb1min = 2;
          const variableQuestion = Matematik.entierAleatoire(1, 3);
      
          if (variableQuestion < 3) {
            const {question, resultats} = JbdbUtils.tableMultiArray(nb1max, nb1min,[2,4,8]);
            return { question, resultats };
          } 
                        
          const {question, resultats} = JbdbUtils.tableMultiTrouArray(nb1max, nb1min, [2,4,8]);
          return { question, resultats };
      },
    }
};

export const materCM2S7Exercises: JbdbExerciseType[] = Array.from({ length: 1 }, (_, ) => createMaterCM2S7Exercise());

 

export const materCM2S7ExerciseIds =
  materCM2S7Exercises.map((exercise) => exercise.exId);

