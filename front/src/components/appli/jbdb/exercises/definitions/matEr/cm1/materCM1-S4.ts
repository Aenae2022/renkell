import { Matematik } from "@utils/Matematik";
import type { JbdbExercise } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createMaterCM1S4Exercise = (nb: number): JbdbExercise => {
  return {
      exId: `jbdb-matercm1-040${nb}`,
      translationId: `jbdb-matercm1-0401`,
      description: "Klokaat d'ar gantad da heul",
      shortTitle: `S${nb}`,
      exampleQuestion: "365 + ? = 400",
      logo: "exercice/calcul/additionersoustraire.png",
      duration: 180,
      exerciseNumber: 30,
      objectif: 80, //objectif visé (ration temps/nb réponses attendu)
      eca: 40, //score en dessous du quel on indique le résultat en rouge
      calculAGenerer()
      : {
        question: string;
        resultats: { texte: string; valeurRep: number }[];
      } {
          const nb1max = 999;
          const nb1min = 152;
                        
          if(nb < 3) {
            const {question, resultats} = JbdbUtils.complement(nb1max, nb1min, 1, 100);
            return { question, resultats };
          }
          const typeQuestion = Matematik.entierAleatoire(1, 2);
          const {question, resultats} = typeQuestion === 1 ? 
          JbdbUtils.complement(nb1max, nb1min, 1, 100) : 
          JbdbUtils.complementInvert(nb1max, nb1min, 1, 100)
          
          return { question, resultats };
      },
    }
};

export const materCM1S4Exercises: JbdbExercise[] = Array.from({ length: 4 }, (_, i) => createMaterCM1S4Exercise(i + 1));

 

export const materCM1S4ExerciseIds =
  materCM1S4Exercises.map((exercise) => exercise.exId);

