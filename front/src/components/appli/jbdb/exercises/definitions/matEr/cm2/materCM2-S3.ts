import { Matematik } from "@utils/Matematik";
import type { JbdbExercise } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createMaterCM2S3Exercise = (nb: number): JbdbExercise => {
  return {
      exId: `jbdb-matercm2-030${nb}`,
      translationId: `jbdb-matercm2-0301`,
      description: "Ajouter ou soustraire 18, 19, 28, 29, 38,39, ...",
      shortTitle: `S${nb}`,
      exampleQuestion: "71 - 38 = ? ",
      logo: "exercice/calcul/additionnersoustraire.png",
      duration: 180,
      exerciseNumber: 30,
      objectif: 70, //objectif visé (ration temps/nb réponses attendu)
      eca: 40, //score en dessous du quel on indique le résultat en rouge
      calculAGenerer(): {
        question: string;
        resultats: { texte: string; valeurRep: number }[];
      } {
        const typeQuestion = Matematik.entierAleatoire(1, 2); //1 addition, 2 soustraction
        const nbmin = 10;
        const nbmax = 990;
        const resultmax = 9999;
        const nbmindiz =1
        const nbmaxdiz = 12
        if(typeQuestion === 1){
          const {question, resultats} = JbdbUtils.add98v1(nbmax, nbmin, resultmax, nbmaxdiz, nbmindiz);
          return { question, resultats };
        }
        const {question, resultats} = JbdbUtils.sous98v1(nbmax, nbmin, nbmaxdiz, nbmindiz);
        return { question, resultats };
      }
    }
};

export const materCM2S3Exercises: JbdbExercise[] = Array.from({ length: 4 }, (_, i) => createMaterCM2S3Exercise(i + 1));

 

export const materCM2S3ExerciseIds =
  materCM2S3Exercises.map((exercise) => exercise.exId);

