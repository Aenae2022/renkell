import { Matematik } from "@utils/Matematik";
import type { JbdbExerciseType } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";
import type { ObjectifCompetenceId } from "@shared/src/referentiels/calculMental/types";

const createMaterCM1S1Exercise = (): JbdbExerciseType => {
  return {
      exId: `jbdb-matercm1-0101`,
      translationId: `jbdb-matercm1-0101`,
      description: "taolioù liesaat",
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
        solutionsAlternatives?: number[][];
        objectifs?: ObjectifCompetenceId[];
      } {
          //tables de multiplication avec(2/3) ou sans trou (1/3)
          const nb1max = 9;
          const nb1min = 2;
          const nb2max = 9;
          const nb2min = 2;
          const variableQuestion = Matematik.entierAleatoire(1, 3);
      
          if (variableQuestion < 3) {
            const {question, resultats} = JbdbUtils.tableMulti(nb1max, nb1min, nb2max, nb2min);
            return { question, resultats, objectifs: ["memoriser-tables-multiplication"], };
          } 
                        
          const {question, resultats} = JbdbUtils.tableMultiTrou(nb1max, nb1min, nb2max, nb2min);
          return { question, resultats, objectifs:  ["memoriser-tables-multiplication"], };
      },
    }
};

export const materCM1S1Exercises: JbdbExerciseType[] = Array.from({ length: 1 }, (_, ) => createMaterCM1S1Exercise());

 

export const materCM1S1ExerciseIds =
  materCM1S1Exercises.map((exercise) => exercise.exId);

