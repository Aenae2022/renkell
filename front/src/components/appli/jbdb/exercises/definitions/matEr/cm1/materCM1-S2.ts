import { Matematik } from "@utils/Matematik";
import type { JbdbExercise } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createMaterCM1S2Exercise1 = (nb: number): JbdbExercise => {
  return {
      exId: `jbdb-matercm1-020${nb}`,
      translationId: `jbdb-matercm1-0201`,
      description: "Ajouter ou soustraire 9, 19, 29, 39",
      shortTitle: `S${nb}`,
      exampleQuestion: "71 - 39 = ? ",
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
        const nbmax = 99;
        const resultmax = 99;
        const nbmindiz =0
        const nbmaxdiz = 3
        if(typeQuestion === 1){
          const {question, resultats} = JbdbUtils.add9v1(nbmax, nbmin, resultmax, nbmaxdiz, nbmindiz);
          return { question, resultats };
                    }
                    const {question, resultats} = JbdbUtils.sous9v1(nbmax, nbmin, nbmaxdiz, nbmindiz);
                    return { question, resultats };
                  }
    }
};

const createMaterCM1S2Exercise2 = (nb: number): JbdbExercise => {
  return {
      exId: `jbdb-matercm1-020${nb}`,
      translationId: `jbdb-matercm1-0202`,
      description: "Ajouter ou soustraire 10, 20, 30, 40 ...",
      shortTitle: `S${nb}`,
      exampleQuestion: "744 - 30 = ? ",
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
          const nbmin = 110;
          const nbmax = 1500;
          const resultmax = 3000;
          const nbmindiz =1
          const nbmaxdiz = 9
          if(typeQuestion === 1){
            const {question, resultats} = JbdbUtils.add10v1(nbmax, nbmin, resultmax, nbmaxdiz, nbmindiz);
                        return { question, resultats };
                    }
                    const {question, resultats} = JbdbUtils.sous10v1(nbmax, nbmin, nbmaxdiz, nbmindiz);
                    return { question, resultats };
    }
  };
}

export const materCM1S2Exercises: JbdbExercise[] = [
  createMaterCM1S2Exercise1(1),
  createMaterCM1S2Exercise1(2),
  createMaterCM1S2Exercise2(3),
  createMaterCM1S2Exercise2(4),
]

 

export const materCM1S2ExerciseIds =
  materCM1S2Exercises.map((exercise) => exercise.exId);

