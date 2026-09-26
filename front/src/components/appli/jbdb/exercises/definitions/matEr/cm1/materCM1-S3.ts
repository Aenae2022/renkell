import type { JbdbExercise } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createMaterCM1S3Exercise = (nb: number): JbdbExercise => {
  return {
      exId: `jbdb-matercm1-030${nb}`,
      translationId: `jbdb-matercm1-0301`,
      description: "Dilemel gant un niver ur sifr ennañ",
      shortTitle: `S${nb}`,
      exampleQuestion: "865 - 8 = ?",
      logo: "exercice/calcul/soustraire.png",
      duration: 180,
      exerciseNumber: 30,
      objectif: 100, //objectif visé (ration temps/nb réponses attendu)
      eca: 50, //score en dessous du quel on indique le résultat en rouge
      calculAGenerer()
      : {
        question: string;
        resultats: { texte: string; valeurRep: number }[];
      } {
          const nb1max = 4599;
          const nb1min = 57;
          const nb2max = 9;
          const nb2min = 3;
                        
          const {question, resultats} = JbdbUtils.sous(nb1max, nb1min, nb2max, nb2min);
          return { question, resultats };
      },
    }
};

export const materCM1S3Exercises: JbdbExercise[] = Array.from({ length: 4 }, (_, i) => createMaterCM1S3Exercise(i + 1));

 

export const materCM1S3ExerciseIds =
  materCM1S3Exercises.map((exercise) => exercise.exId);

