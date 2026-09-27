import { Matematik } from "@utils/Matematik";
import type { JbdbExercise } from "../../../exercises.types";

export const tableAdditionExercises: JbdbExercise[] = [
    {
        //add-degad
        exId: "jbdb-add-degad",
        translationId: "jbdb-add-degad",
        description: "sammañ degadoù",
        shortTitle: "d + d",
        exampleQuestion: "50 + 20 = ",
        logo: "exercice/calcul/additionner.png",
        duration: 180,
        exerciseNumber: 30,
        objectif: 100, //objectif visé (ration temps/nb réponses attendu)
        eca: 50, //score en dessous du quel on indique le résultat en rouge
        calculAGenerer(): {
            question: string;
            resultats: { texte: string; valeurRep: number }[];
        } {
            const nombre1 = Matematik.entierAleatoire(1, 9) * 10;
            const nombre2 = Matematik.entierAleatoire(1, 9) * 10;
            const resultats = [
                { texte: "", valeurRep: nombre1 + nombre2 },
            ];
            const question = nombre1 + " + " + nombre2 + " = ?";
            return { question, resultats };
        },
    },
    {
        //add-kantad
        exId: "jbdb-add-kantad",
        translationId: "jbdb-add-kantad",
        description: "sammañ kantadoù",
        shortTitle: "c - c",
        exampleQuestion: "500 + 200 = ",
        logo: "exercice/calcul/additionner.png",
        duration: 180,
        exerciseNumber: 30,
        objectif: 100, //objectif visé (ration temps/nb réponses attendu)
        eca: 50, //score en dessous du quel on indique le résultat en rouge
        calculAGenerer(): {
            question: string;
            resultats: { texte: string; valeurRep: number }[];
        } {
            const nombre1 = Matematik.entierAleatoire(1, 9) * 100;
            const nombre2 = Matematik.entierAleatoire(1, 9) * 100;
            const resultats = [
                { texte: "", valeurRep: nombre1 + nombre2 },
            ];
            const question = nombre1 + " + " + nombre2 + " = ?";
            return { question, resultats };
        },
    },
]

export const tableAdditionExerciseIds =
    tableAdditionExercises.map((exercise) => exercise.exId);