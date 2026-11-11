import { Matematik } from "@utils/Matematik";
import type { JbdbExerciseType } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createMaterCM1S6Exercise = (): JbdbExerciseType => {
  return {
      exId: `jbdb-matercm1-0601`,
      translationId: `jbdb-matercm1-0601`,
      description: "taolioù liesaat 2 3 4 5 6 10",
      shortTitle: `S1`,
      exampleQuestion: "5 x ? = 10",
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
            const {question, resultats} = JbdbUtils.tableMultiArray(nb1max, nb1min,[2,3,4,5,6,10]);
            return { question, resultats };
          } 
                        
          const {question, resultats} = JbdbUtils.tableMultiTrouArray(nb1max, nb1min, [2,3,4,5,6,10]);
          return { question, resultats };
      },
    }
};

export const materCM1S6Exercises: JbdbExerciseType[] = Array.from({ length: 4 }, (_, ) => createMaterCM1S6Exercise());

 

export const materCM1S6ExerciseIds =
  materCM1S6Exercises.map((exercise) => exercise.exId);

