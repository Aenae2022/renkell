import type { JbdbExerciseType } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createMaterCM2S5Exercise = (nb: number): JbdbExerciseType => {
  return {
      exId: `jbdb-matercm2-050${nb}`,
      translationId: `jbdb-matercm2-0501`,
      description: "Liesaat daou lieskement 10 ...",
      shortTitle: `S${nb}`,
      exampleQuestion: "50 x 200 = 1000",
      logo: "exercice/calcul/multiplier.png",
      duration: 180,
      exerciseNumber: 30,
      objectif: 90, //objectif visé (ration temps/nb réponses attendu)
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
          
          const {question, resultats} = JbdbUtils.multi210(nb1max, nb1min, nb2max, nb2min, 3);
            return { question, resultats };
          
                        
      },
    }
};

export const materCM2S5Exercises: JbdbExerciseType[] = Array.from({ length: 4 }, (_, i) => createMaterCM2S5Exercise(i + 1));

 

export const materCM2S5ExerciseIds =
  materCM2S5Exercises.map((exercise) => exercise.exId);

