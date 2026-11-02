import { Matematik } from "@utils/Matematik";
import type { JbdbExerciseType } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createMaterCM1S5Exercise = (nb: number): JbdbExerciseType => {
  return {
      exId: `jbdb-matercm1-050${nb}`,
      translationId: `jbdb-matercm1-0501`,
      description: "taolioù liesaat 2 3 4 5 10",
      shortTitle: `S${nb}`,
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
            const {question, resultats} = JbdbUtils.tableMultiArray(nb1max, nb1min,[2,3,4,5,10]);
            return { question, resultats };
          } 
                        
          const {question, resultats} = JbdbUtils.tableMultiTrouArray(nb1max, nb1min, [2,3,4,5,10]);
          return { question, resultats };
      },
    }
};

export const materCM1S5Exercises: JbdbExerciseType[] = Array.from({ length: 4 }, (_, i) => createMaterCM1S5Exercise(i + 1));

 

export const materCM1S5ExerciseIds =
  materCM1S5Exercises.map((exercise) => exercise.exId);

