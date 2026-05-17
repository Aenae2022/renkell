import { Matematik } from "@utils/Matematik";
//import type { EcrireNombreItem, EcrireNombreState } from "./ecrireNombre.types";
import type {
  ExerciseGeneriqueItem,
  ExerciseGeneriqueState,
} from "@srcFront/features/exercises/core/exerciseGenerique.type";

// const createItem = (id: number): EcrireNombreItem => {
//   const nb = Matematik.entierAleatoire(1, 9);
//   const typeLangue = Matematik.entierAleatoire(1, 2);
//   const typeQuestion = Matematik.entierAleatoire(1, 2);

//   const nbEnChiffre = Matematik.ecrireNombreEnChiffreEspace(nb);
//   const nbEnLettre =
//     typeLangue === 2
//       ? Matematik.ecrireEnLettreFr(nb)
//       : Matematik.ecrireEnLettreBzh(nb);
//   const reponse =
//     typeQuestion === 1
//       ? nbEnLettre.nombreEnLettre
//       : nbEnChiffre.nombreEnchiffre;
//   const question =
//     typeQuestion === 1
//       ? nbEnChiffre.nombreEnchiffre
//       : nbEnLettre.nombreEnLettre;
//   const reponseDec =
//     typeQuestion === 1
//       ? nbEnLettre.nombreEnLettreDec
//       : nbEnChiffre.nombreEnchiffreDec;
//   const questionDec =
//     typeQuestion === 1
//       ? nbEnChiffre.nombreEnchiffreDec
//       : nbEnLettre.nombreEnLettreDec;

//   const classeColors = {
//     milliard: "text-conjugaison",
//     million: "text-orthographe",
//     mille: "text-resolution",
//     unite: "text-grammaire",
//   };
//   return {
//     id: id,
//     question: {
//       model: question,
//       toShow: (
//         <>
//           {questionDec.map((classe, index) => {
//             return (
//               <span
//                 key={`${classe.type}${index}`}
//                 className={
//                   classeColors[classe.type as keyof typeof classeColors]
//                 }
//               >
//                 {classe.model}
//               </span>
//             );
//           })}
//         </>
//       ),
//     },
//     typeQuestion: typeQuestion,
//     typeLangue: typeLangue === 1 ? "br" : "fr",
//     reponse: [],
//     correction: {
//       model: reponse,
//       toShow: (
//         <>
//           {reponseDec.map((classe, index) => {
//             return (
//               <span
//                 key={`${classe.type}${index}`}
//                 className={
//                   classeColors[classe.type as keyof typeof classeColors]
//                 }
//               >
//                 {classe.model}
//               </span>
//             );
//           })}
//         </>
//       ),
//     },
//     isCorrect: false,
//     itemStatus: "question",
//     conseil: "",
//   };
// };

const createItem = (id: number): ExerciseGeneriqueItem => {
  const nb = Matematik.entierAleatoire(1001, 9999);
  const typeLangue = Matematik.entierAleatoire(1, 2);
  const typeQuestion = Matematik.entierAleatoire(1, 2);

  const nbEnChiffre = Matematik.ecrireNombreEnChiffreEspace(nb);
  const reponseEnLettre = typeQuestion === 1;
  const nbEnLettre =
    typeLangue === 2
      ? Matematik.ecrireEnLettreFr(nb)
      : Matematik.ecrireEnLettreBzh(nb);
  const reponse = reponseEnLettre
    ? nbEnLettre.nombreEnLettre
    : nbEnChiffre.nombreEnchiffre;
  const question = reponseEnLettre
    ? nbEnChiffre.nombreEnchiffre
    : nbEnLettre.nombreEnLettre;
  const reponseDec = reponseEnLettre
    ? nbEnLettre.nombreEnLettreDec
    : nbEnChiffre.nombreEnchiffreDec;
  const questionDec = reponseEnLettre
    ? nbEnChiffre.nombreEnchiffreDec
    : nbEnLettre.nombreEnLettreDec;

  return {
    id: id,
    question: {
      model: question,
      type: "numberClasseColoree",
      data: questionDec,
    },
    typeQuestion: typeQuestion,
    typeLangue: typeLangue === 1 ? "br" : "fr",
    reponse: [],
    correction: {
      model: reponse,
      type: "numberClasseColoree",
      data: reponseDec,
    },
    isCorrect: false,
    itemStatus: "question",
    conseil: "",
  };
};

export const createEcrireNombreInitialState = (
  n: number,
  // ): EcrireNombreState => ({
): ExerciseGeneriqueState => ({
  items: Array.from({ length: n }, (_, i) => createItem(i)),
  status: "run",
  indexItem: 0,
  score: 0,
});
