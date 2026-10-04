import { Matematik } from "@utils/Matematik";
import type { JbdbExercise } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createMaterCM2S4Exercise = (nb: number): JbdbExercise => {
    return {
        exId: `jbdb-matercm2-040${nb}`,
        translationId: `jbdb-matercm2-0401`,
        description: "Maitriser les tables x5 x10",
        shortTitle: `S${nb}`,
        exampleQuestion: "9 x 5 = ? ",
        logo: "exercice/calcul/multiplier.png",
        duration: 180,
        exerciseNumber: 30,
        objectif: 100, //objectif visé (ration temps/nb réponses attendu)
        eca: 60, //score en dessous du quel on indique le résultat en rouge
        calculAGenerer(): {
            question: string;
            resultats: { texte: string; valeurRep: number }[];
        } {
            const typeNombre = Matematik.entierAleatoire(1, 2); //1 5, 2 10
            const typeQuestion = Matematik.entierAleatoire(1, 4); //1 multiplication, 2 division

            const nb1min = 2;
            const nb1max = 10;
            const nb2 = typeNombre === 1 ? 5 : 10;


            if (typeNombre === 1) {
                if (typeQuestion === 1) {
                    const { question, resultats } = JbdbUtils.tableMulti(nb1min, nb1max, nb2, nb2);
                    return { question, resultats };
                } 
                const { question, resultats } = JbdbUtils.tableMultiTrou(nb1min, nb1max, nb2, nb2);
                return { question, resultats };
            }
            
            if (typeQuestion === 1 || typeQuestion === 2 || typeQuestion === 3) {
                    const { question, resultats } = JbdbUtils.tableMulti(nb1min, nb1max, nb2, nb2);
                    return { question, resultats };
                } 
                const { question, resultats } = JbdbUtils.tableMultiTrou(nb1min, nb1max, nb2, nb2);
                return { question, resultats };
            }

        }
    };

    export const materCM2S4Exercises: JbdbExercise[] = Array.from({ length: 4 }, (_, i) => createMaterCM2S4Exercise(i + 1));



    export const materCM2S4ExerciseIds =
        materCM2S4Exercises.map((exercise) => exercise.exId);

