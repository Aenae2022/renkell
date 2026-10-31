import { Matematik } from "@utils/Matematik";
import type {
  ExerciseGeneriqueConfig,
  ExerciseGeneriqueItem,
  ExerciseGeneriqueState,
} from "@srcFront/features/exercises/core/exerciseGenerique.type";
import type {
  EcrireNombreExerciseData,
  EcrireNombreItemData,
} from "./ecrireNombre.type";

const createItem = (
  id: number,
  userData: EcrireNombreExerciseData,
): ExerciseGeneriqueItem<EcrireNombreItemData> => {
  const nb = Matematik.entierAleatoire(userData.nMin, userData.nMax);
  const typeLangue =
    userData.typeLangue === 3
      ? Matematik.entierAleatoire(1, 2)
      : userData.typeLangue;
  const typeQuestion =
    userData.typeQuestion === 3
      ? Matematik.entierAleatoire(1, 2)
      : userData.typeQuestion;

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
      data: questionDec,
    },
    typeQuestion: typeQuestion,
    typeLangue: typeLangue === 1 ? "br" : "fr",
    reponse: [],
    correction: {
      model: reponse,
      data: reponseDec,
    },
    isCorrect: false,
    itemStatus: "question",
    conseil: "",
  };
};

export const createEcrireNombreInitialState = (params: {
  config: ExerciseGeneriqueConfig;
  userData: EcrireNombreExerciseData;
}): ExerciseGeneriqueState<EcrireNombreItemData> => ({
  items: Array.from({ length: params.config.nbExercice }, (_, i) =>
    createItem(i, params.userData),
  ),
  status: "run",
  indexItem: 0,
  score: 0,
});
