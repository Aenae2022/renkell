import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";
import { Matematik } from "@utils/Matematik";
import { Utilitaires } from "@utils/Utilitaires";
import i18n from "i18next";
export const jbdbExosList = [
  {
    champs: "Sammañ ha dilemel",
    categories: [
      {
        //taolioù sammañ
        category: "tableAdd",
        subCategories: [
          {
            //eñvoriñ
            subCategory: "memory",
            exercises: [
              {
                //add-2
                exId: "jbdb-add-2",
                description: "ouzhpennañ 2",
                shortTitle: "+2",
                exampleQuestion: "5 + 2 = ?",
                logo: "exercice/calcul/additionner.png",
                duration: 1,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 2;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 + nombre2 },
                  ];
                  const question = `${nombre1} + ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //add-3
                exId: "jbdb-add-3",
                description: "ouzhpennañ 3",
                shortTitle: "+3",
                exampleQuestion: "5 + 3 = ?",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 3;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 + nombre2 },
                  ];
                  const question = `${nombre1} + ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //add-4
                exId: "jbdb-add-4",
                description: "ouzhpennañ 4",
                shortTitle: "+4",
                exampleQuestion: "5 + 4 = ?",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 4;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 + nombre2 },
                  ];
                  const question = `${nombre1} + ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //add-5
                exId: "jbdb-add-5",
                description: "ouzhpennañ 5",
                shortTitle: "+5",
                exampleQuestion: "5 + 5 = ?",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 5;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 + nombre2 },
                  ];
                  const question = `${nombre1} + ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //add-6
                exId: "jbdb-add-6",
                description: "ouzhpennañ 6",
                shortTitle: "+6",
                exampleQuestion: "5 + 6 = ?",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 6;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 + nombre2 },
                  ];
                  const question = `${nombre1} + ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //add-7
                exId: "jbdb-add-7",
                description: "ouzhpennañ 7",
                shortTitle: "+7",
                exampleQuestion: "5 + 7 = ?",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 7;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 + nombre2 },
                  ];
                  const question = `${nombre1} + ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //add-8
                exId: "jbdb-add-8",
                description: "ouzhpennañ 8",
                shortTitle: "+8",
                exampleQuestion: "5 + 8 = ?",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 8;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 + nombre2 },
                  ];
                  const question = `${nombre1} + ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //add-3
                exId: "jbdb-add-9",
                description: "ouzhpennañ 9",
                shortTitle: "+9",
                exampleQuestion: "5 + 9 = ?",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 9;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 + nombre2 },
                  ];
                  const question = `${nombre1} + ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
            ],
          },
          {
            //pleustriñ
            subCategory: "practice",
            exercises: [
              {
                //add-all
                exId: "jbdb-add-all",
                description: "Taolioù sammañ",
                shortTitle: "an holl",
                exampleQuestion: "5 + 2 = ?",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const resultats = [
                    { texte: "", valeurRep: nombre1 + nombre2 },
                  ];
                  const question = `${nombre1} + ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
            ],
          },
          {
            //mestroniañ
            subCategory: "master",
            exercises: [
              {
                //add-toull-2
                exId: "jbdb-add-toull-2",
                description: "Taolioù sammañ 2 gant toulloù",
                shortTitle: "+2",
                exampleQuestion: "2 + ? = 7",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 2;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 + nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 2);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion == 1) {
                    question = " 2 + ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " + " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //add-toull-3
                exId: "jbdb-add-toull-3",
                description: "Taolioù sammañ 3 gant toulloù",
                shortTitle: "+3",
                exampleQuestion: "3 + ? = 7",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 3;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 + nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 2);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion == 1) {
                    question = nombre1 + " + ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " + " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //add-toull-4
                exId: "jbdb-add-toull-4",
                description: "Taolioù sammañ 4 gant toulloù",
                shortTitle: "+4",
                exampleQuestion: "4 + ? = 7",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 4;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 + nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 2);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion == 1) {
                    question = nombre1 + " + ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " + " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //add-toull-5
                exId: "jbdb-add-toull-5",
                description: "Taolioù sammañ 5 gant toulloù",
                shortTitle: "+5",
                exampleQuestion: "5 + ? = 7",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 5;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 + nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 2);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion == 1) {
                    question = nombre1 + " + ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " + " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //add-toull-6
                exId: "jbdb-add-toull-6",
                description: "Taolioù sammañ 6 gant toulloù",
                shortTitle: "+6",
                exampleQuestion: "6 + ? = 7",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 6;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 + nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 2);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion == 1) {
                    question = nombre1 + " + ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " + " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //add-toull-7
                exId: "jbdb-add-toull-7",
                description: "Taolioù sammañ 7 gant toulloù",
                shortTitle: "+7",
                exampleQuestion: "7 + ? = 7",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 7;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 + nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 2);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion == 1) {
                    question = nombre1 + " + ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " + " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //add-toull-8
                exId: "jbdb-add-toull-8",
                description: "Taolioù sammañ 8 gant toulloù",
                shortTitle: "+8",
                exampleQuestion: "8 + ? = 7",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 8;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 + nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 2);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion == 1) {
                    question = nombre1 + " + ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " + " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //add-toull-9
                exId: "jbdb-add-toull-9",
                description: "Taolioù sammañ 9 gant toulloù",
                shortTitle: "+9",
                exampleQuestion: "9 + ? = 7",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 9;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 + nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 2);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion == 1) {
                    question = nombre1 + " + ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " + " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //add-toull-all
                exId: "jbdb-add-toull-all",
                description: "Taolioù sammañ gant toulloù",
                shortTitle: "an holl",
                exampleQuestion: "3 + ? = 7",
                logo: "exercice/calcul/additionner.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 + nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 2);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion == 1) {
                    question = nombre1 + " + ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " + " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
            ],
          },
        ],
      },
      {
        //traoù all
        category: "others",
        subCategories: [
          {
            //sammañ
            subCategory: "addition",
            exercises: [
              {
                //add-degad
                exId: "jbdb-add-degad",
                description: "sammañ degadoù",
                shortTitle: "d - d",
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
                description: "sammañ kantadoù",
                shortTitle: "d - d",
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
            ],
          },
          {
            //disrannadenn
            subCategory: "decompositionNumber",
            exercises: [
              {
                //dec-cdu
                exId: "jbdb-dec-cdu",
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
                description: "disrannadenn an niveroù betek 999",
                shortTitle: "betek 999 -1",
                exampleQuestion: "5 kantad + 2 zedag + 5 unanenn = ",
                logo: "icons/nombre.png",
                duration: 180,
                exerciseNumber: 20,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
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
                description: "disrannadenn an niveroù betek 999",
                shortTitle: "betek 999 -2",
                exampleQuestion: "5 unanenn + 5 kantad + 2 zedag = ",
                logo: "icons/nombre.png",
                duration: 180,
                exerciseNumber: 15,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const val1 = Matematik.entierAleatoire(0, 8);
                  const val2 = Matematik.entierAleatoire(0, 12);
                  const val3 = Matematik.entierAleatoire(0, 15);
                  const lng = i18n.language;
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
                //dec-mcdu
                exId: "jbdb-dec-mcdu",
                description: "disrannadenn an niveroù betek 9 999",
                shortTitle: "betek 9 999",
                exampleQuestion: "5 000 + 200 + 5 = ",
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
                  const val4 = Matematik.entierAleatoire(0, 9) * 1000;
                  const tableauNombre = [val1, val2, val3, val4];
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
                    { texte: "", valeurRep: val1 + val2 + val3 + val4 },
                  ];
                  return { question, resultats };
                },
              },
            ],
          },
          {
            //dilemel
            subCategory: "subtraction",
            exercises: [
              {
                //sous-taol
                exId: "jbdb-sous-taol",
                description: "dilemel",
                shortTitle: "u - u",
                exampleQuestion: "5 - 2 = ",
                logo: "exercice/calcul/soustraire.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const resultats = [
                    {
                      texte: "",
                      valeurRep:
                        nombre1 > nombre2
                          ? nombre1 - nombre2
                          : nombre2 - nombre1,
                    },
                  ];
                  const question =
                    (nombre1 > nombre2
                      ? nombre1 + " - " + nombre2
                      : nombre2 + " - " + nombre1) + " = ?";
                  return { question, resultats };
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    champs: "Liesaat ha rannañ",
    categories: [
      {
        //taolioù liessat
        category: "tableMulti",
        subCategories: [
          {
            //eñvoriñ
            subCategory: "memory",
            exercises: [
              {
                //multi-2
                exId: "jbdb-multi-2",
                description: "lies 2",
                shortTitle: "x2",
                exampleQuestion: "5 x 2 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 2;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 * nombre2 },
                  ];
                  const question = `${nombre1} x ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //multi-3
                exId: "jbdb-multi-3",
                description: "lies 3",
                shortTitle: "x3",
                exampleQuestion: "5 x 3 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 3;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 * nombre2 },
                  ];
                  const question = `${nombre1} x ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //multi-4
                exId: "jbdb-multi-4",
                description: "lies 4",
                shortTitle: "x4",
                exampleQuestion: "5 x 4 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 4;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 * nombre2 },
                  ];
                  const question = `${nombre1} x ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //multi-5
                exId: "jbdb-multi-5",
                description: "lies 5",
                shortTitle: "x5",
                exampleQuestion: "5 x 5 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 5;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 * nombre2 },
                  ];
                  const question = `${nombre1} x ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //multi-6
                exId: "jbdb-multi-6",
                description: "lies 6",
                shortTitle: "x6",
                exampleQuestion: "5 x 6 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge}
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 6;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 * nombre2 },
                  ];
                  const question = `${nombre1} x ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //multi-7
                exId: "jbdb-multi-7",
                description: "lies 7",
                shortTitle: "x7",
                exampleQuestion: "5 x 7 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 7;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 * nombre2 },
                  ];
                  const question = `${nombre1} x ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //multi-8
                exId: "jbdb-multi-8",
                description: "lies 8",
                shortTitle: "x8",
                exampleQuestion: "5 x 8 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 8;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 * nombre2 },
                  ];
                  const question = `${nombre1} x ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //multi-9
                exId: "jbdb-multi-9",
                description: "lies 9",
                shortTitle: "x9",
                exampleQuestion: "5 x 9 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = 9;
                  const resultats = [
                    { texte: "", valeurRep: nombre1 * nombre2 },
                  ];
                  const question = `${nombre1} x ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
            ],
          },
          {
            //pleustriñ
            subCategory: "practice",
            exercises: [
              {
                //multi-2-3-4-5
                exId: "jbdb-multi-2-3-4-5",
                description: "lies 2, 3, 4 ha 5",
                shortTitle: "x2x3x4x5",
                exampleQuestion: "5 x 3 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = Matematik.entierAleatoire(2, 5);
                  const resultats = [
                    { texte: "", valeurRep: nombre1 * nombre2 },
                  ];
                  const question = `${nombre1} x ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //multi-6-7-8-9
                exId: "jbdb-multi-6-7-8-9",
                description: "lies 6, 7, 8 ha 9",
                shortTitle: "x6x7x8x9",
                exampleQuestion: "4 x 8 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = Matematik.entierAleatoire(6, 9);
                  const resultats = [
                    { texte: "", valeurRep: nombre1 * nombre2 },
                  ];
                  const question = `${nombre1} x ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
              {
                //multi-all
                exId: "jbdb-multi-all",
                description: "taolioù liesaat",
                shortTitle: "an holl",
                exampleQuestion: "4 x 8 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(1, 9);
                  const nombre2 = Matematik.entierAleatoire(2, 9);
                  const resultats = [
                    { texte: "", valeurRep: nombre1 * nombre2 },
                  ];
                  const question = `${nombre1} x ${nombre2} = ?`;
                  return { question, resultats };
                },
              },
            ],
          },
          {
            //mestroniañ
            subCategory: "master",
            exercises: [
              {
                //multi-toull-2
                exId: "jbdb-multi-toull-2",
                description: "taolioù liesaat 2 gant toulloù",
                shortTitle: "x2",
                exampleQuestion: "2 x ? = 10 ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 2;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 * nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion < 3) {
                    question = nombre1 + " x ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " x " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //multi-toull-3
                exId: "jbdb-multi-toull-3",
                description: "taolioù liesaat 3 gant toulloù",
                shortTitle: "x3",
                exampleQuestion: "3 x ? = 27 ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 3;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 * nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion < 3) {
                    question = nombre1 + " x ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " x " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //multi-toull-4
                exId: "jbdb-multi-toull-4",
                description: "taolioù liesaat 4 gant toulloù",
                shortTitle: "x4",
                exampleQuestion: "4 x ? = 36 ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 4;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 * nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion < 3) {
                    question = nombre1 + " x ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " x " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //multi-toull-5
                exId: "jbdb-multi-toull-5",
                description: "taolioù liesaat 5 gant toulloù",
                shortTitle: "x5",
                exampleQuestion: "5 x ? = 45 ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 5;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 * nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion < 3) {
                    question = nombre1 + " x ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " x " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //multi-toull-2-3-4-5
                exId: "jbdb-multi-toull-2-3-4-5",
                description: "taolioù liesaat 2, 3, 4 ha 5 gant toulloù",
                shortTitle: "x2x3x4x5",
                exampleQuestion: "3 x ? = 24 ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(2, 5);
                  const nombre2 = Matematik.entierAleatoire(2, 9);
                  const reponse = nombre1 * nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion < 3) {
                    question = nombre1 + " x ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " x " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //multi-toull-6
                exId: "jbdb-multi-toull-6",
                description: "taolioù liesaat 6 gant toulloù",
                shortTitle: "x6",
                exampleQuestion: "6 x ? = 54 ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 6;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 * nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion < 3) {
                    question = nombre1 + " x ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " x " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //multi-toull-7
                exId: "jbdb-multi-toull-7",
                description: "taolioù liesaat 7 gant toulloù",
                shortTitle: "x7",
                exampleQuestion: "7 x ? = 49 ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 7;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 * nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion < 3) {
                    question = nombre1 + " x ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " x " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //multi-toull-8
                exId: "jbdb-multi-toull-8",
                description: "taolioù liesaat 8 gant toulloù",
                shortTitle: "x8",
                exampleQuestion: "8 x ? = 64 ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 8;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 * nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion < 3) {
                    question = nombre1 + " x ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " x " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //multi-toull-9
                exId: "jbdb-multi-toull-9",
                description: "taolioù liesaat 9 gant toulloù",
                shortTitle: "x9",
                exampleQuestion: "9 x ? = 81 ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = 9;
                  const nombre2 = Matematik.entierAleatoire(1, 9);
                  const reponse = nombre1 * nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion < 3) {
                    question = nombre1 + " x ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " x " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //multi-toull-6-7-8-9
                exId: "jbdb-multi-toull-6-7-8-9",
                description: "taolioù liesaat 6, 7, 8, et 9 gant toulloù",
                shortTitle: "x6x7x8x9",
                exampleQuestion: "6 x ? = 24 ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(6, 9);
                  const nombre2 = Matematik.entierAleatoire(2, 9);
                  const reponse = nombre1 * nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion < 3) {
                    question = nombre1 + " x ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " x " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
              {
                //multi-toull-all
                exId: "jbdb-multi-toull-all",
                description: "taolioù liesaat gant toulloù",
                shortTitle: "an holl",
                exampleQuestion: "6 x ? = 24 ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(2, 9);
                  const nombre2 = Matematik.entierAleatoire(2, 9);
                  const reponse = nombre1 * nombre2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);
                  let question = "";
                  const resultats = [{ texte: "", valeurRep: 0 }];
                  if (variableQuestion < 3) {
                    question = nombre1 + " x ? = " + reponse;
                    resultats[0].valeurRep = nombre2;
                  } else {
                    question = nombre1 + " x " + nombre2 + " = ?";
                    resultats[0].valeurRep = reponse;
                  }
                  return { question, resultats };
                },
              },
            ],
          },
        ],
      },
      {
        //taolioù rannañ
        category: "tablediv",
        subCategories: [
          {
            //eñvoriñ
            subCategory: "memory",
            exercises: [
              {
                //div-2-3-4-5
                exId: "jbdb-div-2-3-4-5",
                description: "rannañ dre 2, 3, 4 ha 5",
                shortTitle: ":2:3:4:5",
                exampleQuestion: "8 : 2 ?",
                logo: "exercice/calcul/diviser.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(0, 9);
                  const multiplicateur = Matematik.entierAleatoire(2, 5);
                  const resultats = [{ texte: "", valeurRep: nombre1 }];
                  const question = `${nombre1 * multiplicateur} : ${multiplicateur} ?`;
                  return { question, resultats };
                },
              },
              {
                //div-6-7-8-9
                exId: "jbdb-div-6-7-8-9",
                description: "rannañ dre 6, 7, 8 ha 9",
                shortTitle: ":6:7:8:9",
                exampleQuestion: "56 : 7 ?",
                logo: "exercice/calcul/diviser.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(0, 9);
                  const multiplicateur = Matematik.entierAleatoire(6, 9);
                  const resultats = [{ texte: "", valeurRep: nombre1 }];
                  const question = `${nombre1 * multiplicateur} : ${multiplicateur} ?`;
                  return { question, resultats };
                },
              },
            ],
          },
          {
            //pleustriñ
            subCategory: "practice",
            exercises: [
              {
                //div-all
                exId: "jbdb-div-all",
                description: "taolioù rannañ",
                shortTitle: "an holl",
                exampleQuestion: "56 : 7 ?",
                logo: "exercice/calcul/diviser.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const nombre1 = Matematik.entierAleatoire(0, 9);
                  const multiplicateur = Matematik.entierAleatoire(2, 9);
                  const resultats = [{ texte: "", valeurRep: nombre1 }];
                  const question = `${nombre1 * multiplicateur} : ${multiplicateur} ?`;
                  return { question, resultats };
                },
              },
            ],
          },
          {
            //mestroniañ
            subCategory: "master",
            exercises: [
              {
                //div-rest-2-3-4-5
                exId: "jbdb-div-rest-2-3-4-5",
                description: "taolioù rannañ dre 2, 3, 4 ha 5 gant ur rest",
                shortTitle: ":2:3:4:5",
                exampleQuestion: "19 : 2 ? q=? r=?",
                logo: "exercice/calcul/diviser.png",
                duration: 100,
                exerciseNumber: 20,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const multiplicateur = Matematik.entierAleatoire(2, 5);
                  const nombre1 = Matematik.entierAleatoire(
                    1,
                    multiplicateur * 10,
                  );
                  const question = nombre1 + " : " + multiplicateur + " ? ";
                  const lng = i18n.language;
                  const quotient = lng === "br" ? "k" : "q";
                  const resultats = [
                    {
                      texte: quotient + " = ",
                      valeurRep: Math.trunc(nombre1 / multiplicateur),
                    },
                    {
                      texte: " r = ",
                      valeurRep: nombre1 % multiplicateur,
                    },
                  ];
                  return { question, resultats };
                },
              },
              {
                //div-rest-6-7-8-9
                exId: "jbdb-div-rest-6-7-8-9",
                description: "taolioù rannañ dre 6, 7, 8 ha 9 gant ur rest",
                shortTitle: ":6:7:8:9",
                exampleQuestion: "19 : 9 ? q=? r=?",
                logo: "exercice/calcul/diviser.png",
                duration: 100,
                exerciseNumber: 20,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const multiplicateur = Matematik.entierAleatoire(6, 9);
                  const nombre1 = Matematik.entierAleatoire(
                    1,
                    multiplicateur * 10,
                  );
                  const question = nombre1 + " : " + multiplicateur + " ? ";
                  const lng = i18n.language;
                  const quotient = lng === "br" ? "k" : "q";
                  const resultats = [
                    {
                      texte: quotient + " = ",
                      valeurRep: Math.trunc(nombre1 / multiplicateur),
                    },
                    {
                      texte: " r = ",
                      valeurRep: nombre1 % multiplicateur,
                    },
                  ];
                  return { question, resultats };
                },
              },
              {
                //div-rest-2-3-4-5
                exId: "jbdb-div-rest-all",
                description: "taolioù rannañ gant ur rest",
                shortTitle: "an holl",
                exampleQuestion: "19 : 2 ? q=? r=?",
                logo: "exercice/calcul/diviser.png",
                duration: 100,
                exerciseNumber: 20,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 50, //score en dessous duquel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  const multiplicateur = Matematik.entierAleatoire(2, 9);
                  const nombre1 = Matematik.entierAleatoire(
                    1,
                    multiplicateur * 10,
                  );
                  const question = nombre1 + " : " + multiplicateur + " ? ";
                  const lng = i18n.language;
                  const quotient = lng === "br" ? "k" : "q";
                  const resultats = [
                    {
                      texte: quotient + " = ",
                      valeurRep: Math.trunc(nombre1 / multiplicateur),
                    },
                    {
                      texte: " r = ",
                      valeurRep: nombre1 % multiplicateur,
                    },
                  ];
                  return { question, resultats };
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
