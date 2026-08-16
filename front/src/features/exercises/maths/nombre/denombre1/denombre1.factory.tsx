import { Matematik } from "@utils/Matematik";
import type {
  ExerciseGeneriqueConfig,
  ExerciseGeneriqueItem,
  ExerciseGeneriqueState,
} from "@srcFront/features/exercises/core/exerciseGenerique.type";
import type {
  Denombre1ExerciseData,
  Denombre1ItemData,
} from "./denombre1.types";
import { Utilitaires } from "@utils/Utilitaires";

const createItem = (
  id: number,
  userData: Denombre1ExerciseData,
): ExerciseGeneriqueItem<Denombre1ItemData> => {
  const correction = Matematik.entierAleatoire(userData.nMin, userData.nMax);
  const nbDecoupeExo = Matematik.decomposeNombre(
    correction,
    userData.regroupement === 2,
  );
  const correctionDecoupeTemp = Matematik.decoupeRangClasseNombre(correction);
  const correctionDecoupe = {
    nbUnite: correctionDecoupeTemp.unite,
    nbDizaine: correctionDecoupeTemp.dizaine,
    nbCentaine: correctionDecoupeTemp.centaine,
  };

  const typeRepresentation =
    userData.typeQuestion[
      Matematik.entierAleatoire(1, userData.typeQuestion.length) - 1
    ];
  const typeLangue =
    userData.typeLangue === 3
      ? Matematik.entierAleatoire(1, 2)
      : userData.typeLangue;
  const lexiqueRangBR = ["k", "d", "u"];
  const lexiqueRangFR = ["c", "d", "u"];
  const lexiqueRang = typeLangue === 1 ? lexiqueRangBR : lexiqueRangFR;
  const lexiqueRepresentationFR = ["cubes", "monnaie", "addition"];
  const lexiqueRepresentationBR = ["kuboù", "monneiz", "sammadenn"];
  const lexiqueRepresentation =
    typeLangue === 1 ? lexiqueRepresentationBR : lexiqueRepresentationFR;
  let questionModel = "";
  if (typeRepresentation === "3") {
    const termes = [];
    if (nbDecoupeExo.nbCentaine > 0)
      termes.push(nbDecoupeExo.nbCentaine + " " + lexiqueRang[0]);
    if (nbDecoupeExo.nbDizaine > 0)
      termes.push(nbDecoupeExo.nbDizaine + " " + lexiqueRang[1]);
    if (nbDecoupeExo.nbUnite > 0)
      termes.push(nbDecoupeExo.nbUnite + " " + lexiqueRang[2]);
    const shuffleTermes = Utilitaires.shuffleArray(termes);
    const question = shuffleTermes.join(" + ") + " = ";
    questionModel = question;
  } else {
    questionModel =
      nbDecoupeExo.nbCentaine > 0
        ? nbDecoupeExo.nbCentaine + " " + lexiqueRang[0]
        : "";
    questionModel +=
      nbDecoupeExo.nbCentaine !== 0 &&
      (nbDecoupeExo.nbDizaine > 0 || nbDecoupeExo.nbUnite > 0)
        ? " + "
        : "";
    questionModel +=
      nbDecoupeExo.nbDizaine > 0
        ? "" + nbDecoupeExo.nbDizaine + " " + lexiqueRang[1]
        : "";
    questionModel +=
      nbDecoupeExo.nbUnite > 0 && nbDecoupeExo.nbDizaine > 0 ? " + " : "";
    questionModel +=
      nbDecoupeExo.nbUnite > 0
        ? "" + nbDecoupeExo.nbUnite + " " + lexiqueRang[2]
        : "";
    questionModel +=
      ", " + lexiqueRepresentation[Number(typeRepresentation) - 1];
  }
  return {
    id: id,
    question: {
      model: questionModel,
      data: nbDecoupeExo,
    },
    typeQuestion: Number(typeRepresentation),
    typeLangue: typeLangue === 1 ? "br" : "fr",
    reponse: [],
    correction: {
      model: correction.toString(),
      data: correctionDecoupe,
    },
    isCorrect: false,
    itemStatus: "question",
    conseil: "",
  };
};

export const createDenombre1InitialState = (params: {
  config: ExerciseGeneriqueConfig;
  userData: Denombre1ExerciseData;
}): ExerciseGeneriqueState<Denombre1ItemData> => ({
  items: Array.from({ length: params.config.nbExercice }, (_, i) =>
    createItem(i, params.userData),
  ),
  status: "run",
  indexItem: 0,
  score: 0,
});
