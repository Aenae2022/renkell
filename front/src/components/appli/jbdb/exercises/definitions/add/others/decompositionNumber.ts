import { Matematik } from "@utils/Matematik";
import type { JbdbExercise } from "../../../exercises.types";
import { Utilitaires } from "@utils/Utilitaires";
import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";
import i18n from "@srcFront/i18n";
import { JbdbUtils } from "@utils/jbdbUtils";

export const decompositionNumberExercises: JbdbExercise[] = [
    {
        //dec-cdu
        exId: "jbdb-dec-cdu",
        translationId: "jbdb-dec-cdu",
        description: "disrannadenn an niveroù betek 999",
        shortTitle: "betek 999",
        exampleQuestion: "500 + 20 + 5 = ",
        logo: "icons/nombre.png",
        duration: 180,
        exerciseNumber: 30,
        objectif: 100, //objectif visé (ration temps/nb réponses attendu)
        eca: 50, //score en dessous du quel on indique le résultat en rouge
        calculAGenerer(): {
            question: string;
            resultats: { texte: string; valeurRep: number }[];
        } {
            const val1 = Matematik.entierAleatoire(1, 9) * 100;
            const val2 = Matematik.entierAleatoire(0, 9) * 10;
            const val3 = Matematik.entierAleatoire(0, 9);
            const tableauNombre = [val1, val2, val3];
            const tableauJson = JSON.stringify(tableauNombre);
            const tableauMix = Utilitaires.shuffleArray(
                JSON.parse(tableauJson),
            );
            let question = "";
            for (let i = 0; i < tableauMix.length; i++) {
                if (tableauMix[i]) {
                    if (i === 0 && tableauMix[i] !== 0) {
                        question += tableauMix[i];
                    } else if (tableauMix[i] !== 0) {
                        if (question.length > 0) {
                            question += " + " + tableauMix[i];
                        } else {
                            question += tableauMix[i];
                        }
                    }
                }
            }
            const resultats = [
                { texte: "", valeurRep: val1 + val2 + val3 },
            ];
            return { question, resultats };
        },
    },
    {
        //dec-cdu-unite
        exId: "jbdb-dec-cdu-unite",
        translationId: "jbdb-dec-cdu-unite",
        description: "disrannadenn an niveroù betek 999",
        shortTitle: "betek 999 -1",
        exampleQuestion: "5 kantad + 2 zedag + 5 unanenn = ",
        logo: "icons/nombre.png",
        duration: 180,
        exerciseNumber: 30,
        objectif: 85, //objectif visé (ration temps/nb réponses attendu)
        eca: 40, //score en dessous du quel on indique le résultat en rouge
        calculAGenerer(): {
            question: string;
            resultats: { texte: string; valeurRep: number }[];
        } {
            const val1 = Matematik.entierAleatoire(0, 9);
            const val2 = Matematik.entierAleatoire(0, 9);
            const val3 = Matematik.entierAleatoire(0, 9);
            const tableauNombre = [
                { nb: val1, rang: 100 },
                { nb: val2, rang: 10 },
                { nb: val3, rang: 1 },
            ];
            const tableauJson = JSON.stringify(tableauNombre);
            const tableauMix: {
                nb: EntierPositifType;
                rang: EntierPositifType;
            }[] = Utilitaires.shuffleArray(JSON.parse(tableauJson));
            let question = "";
            const lng = i18n.language;
            for (let i = 0; i < tableauMix.length; i++) {
                if (tableauMix[i]) {
                    if (tableauMix[i].nb !== 0) {
                        if (question.length > 0) {
                            question += " + ";
                        }
                        question += tableauMix[i].nb;
                        if (lng === "br") {
                            switch (tableauMix[i].rang) {
                                case 100:
                                    if (tableauMix[i].nb === 2) {
                                        question += " gantad";
                                    } else if (
                                        tableauMix[i].nb === 3 ||
                                        tableauMix[i].nb === 4 ||
                                        tableauMix[i].nb === 9
                                    ) {
                                        question += " c'hantad";
                                    } else {
                                        question += " kantad";
                                    }
                                    break;
                                case 10:
                                    if (tableauMix[i].nb === 2) {
                                        question += " zegad";
                                    } else {
                                        question += " degad";
                                    }
                                    break;
                                case 1:
                                    question += " unanenn";
                                    break;
                            }
                        } else {
                            switch (tableauMix[i].rang) {
                                case 100:
                                    if (tableauMix[i].nb === 1) {
                                        question += " centaine";
                                    } else {
                                        question += " centaines";
                                    }
                                    break;
                                case 10:
                                    if (tableauMix[i].nb === 1) {
                                        question += " dizaine";
                                    } else {
                                        question += " dizaines";
                                    }
                                    break;
                                case 1:
                                    if (tableauMix[i].nb === 1) {
                                        question += " unité";
                                    } else {
                                        question += " unités";
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            const resultats = [
                { texte: "", valeurRep: val1 * 100 + val2 * 10 + val3 },
            ];
            return { question, resultats };
        },
    },
    {
        //dec-cdu-unite
        exId: "jbdb-dec-cdu-unite-2",
        translationId: "jbdb-dec-cdu-unite-2",
        description: "disrannadenn an niveroù betek 999",
        shortTitle: "betek 999 -2",
        exampleQuestion: "5 unanenn + 5 kantad + 12 dedag = ",
        logo: "icons/nombre.png",
        duration: 180,
        exerciseNumber: 30,
        objectif: 50, //objectif visé (ration temps/nb réponses attendu)
        eca: 10, //score en dessous du quel on indique le résultat en rouge
        calculAGenerer(): {
            question: string;
            resultats: { texte: string; valeurRep: number }[];
        } {
            const lng = i18n.language;
            return JbdbUtils.decompose10000max(999, 100, lng)
        },
    },
    {
        //dec-mcdu
        exId: "jbdb-dec-mcdu",
        translationId: "jbdb-dec-mcdu",
        description: "disrannadenn an niveroù betek 9 999",
        shortTitle: "betek 9 999",
        exampleQuestion: "5m + 18u + 9d = ",
        logo: "icons/nombre.png",
        duration: 180,
        exerciseNumber: 30,
        objectif: 50, //objectif visé (ration temps/nb réponses attendu)
        eca: 10, //score en dessous du quel on indique le résultat en rouge
        calculAGenerer(): {
            question: string;
            resultats: { texte: string; valeurRep: number }[];
        } {
            const lng = i18n.language;
            return JbdbUtils.decompose10000max(9999, 500, lng)
        },
    },
]

export const decompositionNumberExerciseIds =
    decompositionNumberExercises.map((exercise) => exercise.exId);