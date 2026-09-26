import { Matematik } from "@utils/Matematik";
import type { JbdbExercise } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createMaterCM2S1Exercise = (nb: number): JbdbExercise => {
  return {
      exId: `jbdb-matercm2-010${nb}`,
      translationId: `jbdb-matercm1-0101`,
      description: "taolioù liesaat",
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
          const nb2max = 9;
          const nb2min = 2;
          const variableQuestion = Matematik.entierAleatoire(1, 3);
      
          if (variableQuestion < 3) {
            const {question, resultats} = JbdbUtils.tableMulti(nb1max, nb1min, nb2max, nb2min);
            return { question, resultats };
          } 
                        
          const {question, resultats} = JbdbUtils.tableMultiTrou(nb1max, nb1min, nb2max, nb2min);
          return { question, resultats };
      },
    }
};

export const materCM2S1Exercises: JbdbExercise[] = Array.from({ length: 4 }, (_, i) => createMaterCM2S1Exercise(i + 1));

 

export const materCM2S1ExerciseIds =
  materCM2S1Exercises.map((exercise) => exercise.exId);

