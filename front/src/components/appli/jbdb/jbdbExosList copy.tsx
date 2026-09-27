import { Matematik } from "@utils/Matematik";
import i18n from "i18next";
import {JbdbUtils} from "@utils/jbdbUtils";
export const jbdbExosList = [
  {
    champs: "Sammañ ha dilemel",
    categories: [
      
      {
        //traoù all
        category: "others",
        subCategories: [
          
          {
            //disrannadenn
            subCategory: "decompositionNumber",
            exercises: [
              {
                
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
  {
    champs : "Mat er",
    categories: [
      {
        category: "matercm1",
        subCategories: [
          {
            //séquence 1
            subCategory: "matercm1sequence1",
            exercises: [
              {
                //S1
                exId: "jbdb-matercm1-0101",
                description: "séance 1",
                shortTitle: "S1-2-3-4",
                exampleQuestion: "5 x 2 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 40, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  //tables de multiplication avec(2/3) ou sans trou (1/3)
                  const nb1max = 9;
                  const nb1min = 2;
                  const nb2max = 9;
                  const nb2min = 2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);

                  
                  if (variableQuestion < 3) {
                    const {question, resultats} = JbdbUtils.tableMulti(nb1max, nb1min, nb2max, nb2min);
                    return { question, resultats };
                  } 
                  
                  const {question, resultats} = JbdbUtils.tableMultiTrou(nb1max, nb1min, nb2max, nb2min);
                  return { question, resultats };
                },
              },
            ]
          },
          {
            //séquence 2
            subCategory: "matercm1sequence2",
            exercises: [
              {
                //S1-S2
                exId: "jbdb-matercm1-0201",
                description: "séance 1",
                shortTitle: "S1-2",
                exampleQuestion: "71 - 39 = ? ",
                logo: "exercice/calcul/additionnersoustraire.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
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
              },
              {
                //S3-S4
                exId: "jbdb-matercm1-0202",
                description: "séances 3 4",
                shortTitle: "S3-S4",
                exampleQuestion: "71 - 30 = ? ",
                logo: "exercice/calcul/additionnersoustraire.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
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
                },
              },
            ]
          }
        ]
      },
      {
        category: "matercm2",
        subCategories: [
          {
            //séquence 1
            subCategory: "matercm1sequence1",
            exercises: [
              {
                //S1
                exId: "jbdb-matercm1-0101",
                description: "séance 1",
                shortTitle: "S1-2-3-4",
                exampleQuestion: "5 x 2 = ",
                logo: "exercice/calcul/multiplier.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 40, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  //tables de multiplication avec(2/3) ou sans trou (1/3)
                  const nb1max = 9;
                  const nb1min = 2;
                  const nb2max = 9;
                  const nb2min = 2;
                  const variableQuestion = Matematik.entierAleatoire(1, 3);

                  
                  if (variableQuestion < 3) {
                    const {question, resultats} = JbdbUtils.tableMulti(nb1max, nb1min, nb2max, nb2min);
                    return { question, resultats };
                  } 
                  
                  const {question, resultats} = JbdbUtils.tableMultiTrou(nb1max, nb1min, nb2max, nb2min);
                  return { question, resultats };
                },
              },
              
            ]
          },
          {
            //séquence 2
            subCategory: "matercm2sequence2",
            exercises: [
              {
                //S1-2-3-4
                exId: "jbdb-matercm2-0201",
                description: "séance 1",
                shortTitle: "S1-2-3-4",
                exampleQuestion: "560 + ? = 600",
                logo: "icons/calcul-2.png",
                duration: 180,
                exerciseNumber: 30,
                objectif: 100, //objectif visé (ration temps/nb réponses attendu)
                eca: 40, //score en dessous du quel on indique le résultat en rouge
                calculAGenerer(): {
                  question: string;
                  resultats: { texte: string; valeurRep: number }[];
                } {
                  //1. add/sous
                  //2. multi/div
                  const typeQuestion = Matematik.entierAleatoire(1, 2);
                  if(typeQuestion === 1){
                    //les add/sous 
                    //1 cplt à 100 40 + ? = 100
                    //2 cplt à 1000 500 + ? = 1000
                    //3 cplt à la centaine supérieure 560 + ? = 600
                    //4 ajout ou soustraire un nombre de dizaine nb<1000
                    //5 ajout ou soustraire un nombre de centaines nb<1000
                    const variableQuestion = Matematik.entierAleatoire(1, 7);
                    if (variableQuestion === 1) {
                      //nbmax: number, nbmin: number, valexpnb: number, valexp: number
                      const {question, resultats} = JbdbUtils.complement(99, 10, 10, 100);
                      return { question, resultats };
                    } 
                    if (variableQuestion === 2) {
                      //nbmax: number, nbmin: number, valexpnb: number, valexp: number
                      const {question, resultats} = JbdbUtils.complement(999, 100, 100, 1000);
                      return { question, resultats };
                    } 
                    if (variableQuestion === 3) {
                      //nbmax: number, nbmin: number, valexpnb: number, valexp: number
                      const {question, resultats} = JbdbUtils.complement(999, 100, 10, 100);
                      return { question, resultats };
                    }
                    if (variableQuestion === 4) {
                      //nbmax: number, nbmin: number, resultMax: number, nbmaxdiz: number, nbminDiz: number, valexp:number = 10
                      const {question, resultats} = JbdbUtils.add10v1(600, 40, 1000, 9, 2,10);
                      return { question, resultats };
                    }
                    if (variableQuestion === 5) {
                      //nbmax: number, nbmin: number, resultMax: number, nbmaxdiz: number, nbminDiz: number, valexp:number = 100
                      const {question, resultats} = JbdbUtils.add10v1(600, 140, 1000, 6, 2,100);
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
              },
              
            ]
          }
        ]
      }
    ],
  },
];
