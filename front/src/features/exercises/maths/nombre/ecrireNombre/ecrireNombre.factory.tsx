import { Matematik } from "@utils/Matematik";
import type { EcrireNombreItem, EcrireNombreState } from "./ecrireNombre.types";

const createItem = (id: number): EcrireNombreItem => {
  const nb = Matematik.entierAleatoire(2100, 7100);
  const typeLangue = Matematik.entierAleatoire(1, 2);
  const typeQuestion = Matematik.entierAleatoire(1, 2);

  const nbEnChiffre = Matematik.ecrireNombreEnChiffreEspace(nb);
  const nbEnLettre =
    typeLangue === 2
      ? Matematik.ecrireEnLettreFr(nb)
      : Matematik.ecrireEnLettreBzh(nb);
  const reponse =
    typeQuestion === 1
      ? nbEnLettre.nombreEnLettre
      : nbEnChiffre.nombreEnchiffre;
  const question =
    typeQuestion === 1
      ? nbEnChiffre.nombreEnchiffre
      : nbEnLettre.nombreEnLettre;
  const reponseDec =
    typeQuestion === 1
      ? nbEnLettre.nombreEnLettreDec
      : nbEnChiffre.nombreEnchiffreDec;
  const questionDec =
    typeQuestion === 1
      ? nbEnChiffre.nombreEnchiffreDec
      : nbEnLettre.nombreEnLettreDec;

  const classeColors = {
    milliard: "conjugaison",
    million: "orthographe",
    mille: "resolution",
    unite: "grammaire",
  };
  return {
    id: id,
    question: {
      model: question,
      toShow: (
        <>
          {questionDec.map((classe, index) => {
            return (
              <span
                key={`${classe.type}${index}`}
                className={`text-${classeColors[classe.type as keyof typeof classeColors]}`}
              >
                {classe.model}
              </span>
            );
          })}
        </>
      ),
    },
    typeQuestion: typeQuestion,
    typeLangue: typeLangue === 1 ? "br" : "fr",
    reponse: [],
    correction: {
      model: reponse,
      toShow: (
        <>
          {reponseDec.map((classe, index) => {
            return (
              <span
                key={`${classe.type}${index}`}
                className={`text-${classeColors[classe.type as keyof typeof classeColors]}`}
              >
                {classe.model}
              </span>
            );
          })}
        </>
      ),
    },
    isCorrect: false,
    itemStatus: "question",
    conseil: "",
  };
};

export const createEcrireNombreInitialState = (
  n: number,
): EcrireNombreState => ({
  items: Array.from({ length: n }, (_, i) => createItem(i)),
  status: "run",
  indexItem: 0,
});
