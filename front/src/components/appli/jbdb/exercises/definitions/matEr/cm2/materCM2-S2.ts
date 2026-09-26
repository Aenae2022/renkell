import { Matematik } from "@utils/Matematik";
import type { JbdbExercise } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createMaterCM2S2Exercise = (nb: number): JbdbExercise => {
  return {
      exId: `jbdb-matercm2-010${nb}`,
      translationId: `jbdb-matercm2-0201`,
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
          //1. add/sous
          //2. multi/div
                  const typeQuestion = Matematik.entierAleatoire(1, 2);
                  if(typeQuestion === 1){
                    //les add/sous 
                    //1 cplt à 100 40 + ? = 100
                    //2-3 cplt à 1000 500 + ? = 1000
                    //4-5 cplt à la centaine supérieure 560 + ? = 600
                    //6 ajout ou soustraire un nombre de dizaine nb<1000
                    //7 ajout ou soustraire un nombre de centaines nb<1000
                    const variableQuestion = Matematik.entierAleatoire(1, 7);
                    if (variableQuestion === 1) {
                      //nbmax: number, nbmin: number, valexpnb: number, valexp: number
                      const {question, resultats} = JbdbUtils.complement(99, 10, 10, 100);
                      return { question, resultats };
                    } 
                    if (variableQuestion === 2 || variableQuestion === 3) {
                      //nbmax: number, nbmin: number, valexpnb: number, valexp: number
                      const {question, resultats} = JbdbUtils.complement(999, 100, 100, 1000);
                      return { question, resultats };
                    } 
                    if (variableQuestion === 4 || variableQuestion === 5) {
                      //nbmax: number, nbmin: number, resultMax: number, nbmaxdiz: number, nbminDiz: number, valexp:number = 10
                      const {question, resultats} = JbdbUtils.add10v1(600, 40, 1000, 9, 2,10);
                      return { question, resultats };
                    }
                    
                    if (variableQuestion === 6) {
                      //nbmax: number, nbmin: number,  nbmaxdiz: number, nbminDiz: number, valexp:number = 10
                      const {question, resultats} = JbdbUtils.sous10v1(999, 30, 9, 2,10);
                      return { question, resultats };
                    }
                    if (variableQuestion === 7) {
                      //nbmax: number, nbmin: number, nbmaxdiz: number, nbminDiz: number, valexp:number = 100
                      const {question, resultats} = JbdbUtils.sous10v1(999, 80, 6, 2,100);
                      return { question, resultats };
                    }
                  }
                  if(typeQuestion === 2){
                    //les multi/div
                    //1. multi par 10
                    //2. multi par 100
                    //3. div par 10 resultat entier
                    const variableQuestion = Matematik.entierAleatoire(1, 7);
                    if (variableQuestion === 1 || variableQuestion === 2 || variableQuestion === 3) {
                      //nb1max: number, nb1min: number, multimax:number, multimin:number, valexp:number
                      const {question, resultats} = JbdbUtils.multi10(99, 11, 1, 1,10 );
                      return { question, resultats };
                    }
                    if (variableQuestion === 4 || variableQuestion === 5 || variableQuestion === 6) {
                      //nb1max: number, nb1min: number, multimax:number, multimin:number, valexp:number
                      const {question, resultats} = JbdbUtils.multi10(99, 8, 1, 1,100 );
                      return { question, resultats };
                    }
                    if (variableQuestion === 7) {
                      //nb1max: number, nb1min: number, divmax:number, divmin:number, valexp:number
                      const {question, resultats} = JbdbUtils.div10Entier(950, 50, 1, 1,10 );
                      return { question, resultats };
                    }
                  }
                  return { question : "", resultats : [{texte: "", valeurRep: 0}] };
      },
    }
};

export const materCM2S2Exercises: JbdbExercise[] = Array.from({ length: 4 }, (_, i) => createMaterCM2S2Exercise(i + 1));

 

export const materCM2S2ExerciseIds =
  materCM2S2Exercises.map((exercise) => exercise.exId);

