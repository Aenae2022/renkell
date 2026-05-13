import { Matematik } from "@utils/Matematik";
import { type Denombre1State } from "./denombre1.types";

const createItem = (id: number) => {
  const nbUnite = Matematik.entierAleatoire(0, 15);
  const nbDizaine = Matematik.entierAleatoire(0, 15);
  const nbCentaine = Matematik.entierAleatoire(0, 7);
  const correction = nbCentaine * 100 + nbDizaine * 10 + nbUnite;
  const chiffreUniteCorr = correction % 10;
  const chiffreDizaineCorr = ((correction - chiffreUniteCorr) % 100) / 10;
  const chiffreCentaineCorr = (correction - (correction % 100)) / 100;
  const typeRepresentation = Matematik.entierAleatoire(1, 1);
  const typeLangue = Matematik.entierAleatoire(1, 2);

  return {
    id: id,
    question: {
      nbUnite: nbUnite,
      nbDizaine: nbDizaine,
      nbCentaine: nbCentaine,
    },
    typeRepresentation: typeRepresentation,
    typeLangue: typeLangue === 1 ? "br" : "fr",
    reponse: [],
    correction: {
      nb: correction,
      toShow: (
        <>
          {chiffreCentaineCorr != 0 ? (
            <span className="text-orthographe">{chiffreCentaineCorr}</span>
          ) : null}
          {chiffreCentaineCorr != 0 || chiffreDizaineCorr != 0 ? (
            <span className="text-calcul">{chiffreDizaineCorr}</span>
          ) : null}
          <span className="text-grammaire">{chiffreUniteCorr}</span>
        </>
      ),
    },
    isCorrect: false,
    itemStatus: "question",
  };
};

export const createDenombre1InitialState = (n: number): Denombre1State => ({
  items: Array.from({ length: n }, (_, i) => createItem(i)),
  status: "run",
  indexItem: 0,
});
