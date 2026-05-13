import MaJbdbCorrection from "./MaJbdbCorrection";
import MaJbdbdRond from "./MaJbdbRond";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNameDialog } from "@hook/useNameDialog";
import MaJbdbResultPrint from "../../../document/library/MaJbdbResultPrint";
import { pdf } from "@react-pdf/renderer";
import type { UserSessionConnectType } from "@shared/schema/user.schema";

type GeneralResultsProps = {
  items: {
    question: string;
    resultats: { texte: string; valeurRep: number }[];
    reponses: (string | number)[][];
    indexCalcul: number;
    validation: boolean;
  }[];
  timeWork: number;
  modele: {
    exId: string; //+
    description: string; //+
    shortTitle: string; //+
    logo: string; //+
    exampleQuestion: string; //+
    duration: number; //+
    exerciseNumber: number; //+
    objectif: number; //+
    eca: number; //+
    calculAGenerer: () => void; //+
  };
  itemSelected: number;
  setRestart: () => void;
};
export default function MaJbdbResult({
  items,
  timeWork,
  modele,
  itemSelected,
  setRestart,
}: GeneralResultsProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  let monScore = items.reduce(
    (count, item) => (item.validation ? count + 1 : count),
    0,
  );
  //on transforme pour avoir un résultat sur 100
  monScore = Math.round((monScore / items.length) * 100);
  const { askName, dialog } = useNameDialog();
  const user = useOutletContext<UserSessionConnectType>();

  //définir le logo en fonction du résultat et des attentes
  let sourceLogo = "/src/assets/pictures/exercice/";

  // -------------------------------- STYLE --------------------------------------------------------
  const resultsScoreColorVariants = {
    neutral: "block relative text-center text-black z-30 text-5xl top-[-100px]",
    vert: "block relative text-center text-lime-500 z-30 text-5xl top-[-100px]",
    orange:
      "block relative text-center text-orange-600 z-30 text-5xl top-[-100px]",
    rouge: "block relative text-center text-red-600 z-30 text-5xl top-[-100px]",
  };
  let resultsScoreStyle =
    resultsScoreColorVariants[
      "neutral" as keyof typeof resultsScoreColorVariants
    ];
  const buttonStyle =
    "w-48 mt-8 pt-1 pb-2 cursor-pointer text-center rounded-full border-2 border-gray-400";
  if (monScore >= modele.objectif) {
    sourceLogo = sourceLogo + "laurierVert.png";
    resultsScoreStyle =
      resultsScoreColorVariants[
        "vert" as keyof typeof resultsScoreColorVariants
      ];
  } else if (monScore >= modele.eca) {
    sourceLogo = sourceLogo + "laurierOrange.png";
    resultsScoreStyle =
      resultsScoreColorVariants[
        "orange" as keyof typeof resultsScoreColorVariants
      ];
  } else {
    sourceLogo = sourceLogo + "laurierRouge.png";
    resultsScoreStyle =
      resultsScoreColorVariants[
        "rouge" as keyof typeof resultsScoreColorVariants
      ];
  }

  //------------------------------------------------------------------------------------------------

  const minute = Math.trunc(timeWork / 60);
  const seconde = timeWork % 60;

  //création des tableaux de correction
  const nbLigneComplete = Math.trunc(items.length / 3);
  const nbCalculsRestants = items.length % 3;
  const indiceTableau2 =
    nbCalculsRestants == 0 ? nbLigneComplete : nbLigneComplete + 1;
  const indiceTableau3 =
    nbCalculsRestants == 0
      ? nbLigneComplete + indiceTableau2
      : nbLigneComplete + indiceTableau2 + 1;

  const tableau1 = items.slice(0, indiceTableau2);
  const tableau2 = items.slice(indiceTableau2, indiceTableau3);
  const tableau3 = items.slice(indiceTableau3);

  const nbToPush = tableau1.length - tableau3.length;
  const eltPush: number[] = [];
  for (let i = 0; i < nbToPush; i++) {
    eltPush.push(i + 1);
  }

  const generatePdf = async (name: string) => {
    const blob = await pdf(
      <MaJbdbResultPrint
        name={name}
        sourceLogo={sourceLogo}
        monScore={monScore}
        minute={minute}
        seconde={seconde}
        tableau1={tableau1}
        tableau2={tableau2}
        tableau3={tableau3}
        indiceTableau2={indiceTableau2}
        indiceTableau3={indiceTableau3}
        eltPush={eltPush}
        modele={modele}
      />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    // Crée un lien temporaire et déclenche le téléchargement
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.pdf";
    link.click();

    // Nettoie l'URL après utilisation
    URL.revokeObjectURL(url);
  };
  async function handlePrint() {
    console.log("user", user);
    if (user) {
      generatePdf(`${user.userFirstName} ${user.userFamilyName}`);
    } else {
      const name = await askName();
      if (!name) return; // utilisateur a annulé
      generatePdf(name);
    }
  }

  return (
    <div>
      <MaJbdbdRond items={items} itemSelected={itemSelected} />
      <div className="mt-3">
        <img src={sourceLogo} alt="laurier" className="w-48 block m-auto" />
        <div className={resultsScoreStyle}>{monScore}</div>
      </div>
      <p className="mb-3">
        {" "}
        {t("jbdb.exercise.timer")} {minute > 0 && `${minute} m`}{" "}
        {seconde > 0 && `${seconde} s`}
      </p>
      <div className="flex justify-around max-w-full">
        <table>
          <tbody>
            {tableau1.map((item, indice) => (
              <tr key={`tableau1-${indice}`}>
                <MaJbdbCorrection item={item} indice={indice} count={0} />
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <tbody>
            {tableau2.map((item, indice) => (
              <tr key={`tableau2-${indice}`}>
                <MaJbdbCorrection
                  item={item}
                  indice={indice}
                  count={indiceTableau2}
                />
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <tbody>
            {tableau3.map((item, indice) => (
              <tr key={`tableau3-${indice}`}>
                <MaJbdbCorrection
                  item={item}
                  indice={indice}
                  count={indiceTableau3}
                />
              </tr>
            ))}
            {eltPush.map((el) => (
              <tr key={el} className="whitespace-nowrap mh-7">
                <td> </td>
                <td> - </td>
                <td> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="jbdb-result-navigation-container">
        <button className={buttonStyle} onClick={setRestart}>
          {t("jbdb.exercise.againButton")}
        </button>
        <button
          className={buttonStyle}
          onClick={() => navigate("..", { relative: "path" })}
        >
          {t("jbdb.exercise.exitButton")}
        </button>
        <button className={buttonStyle} onClick={handlePrint}>
          {t("jbdb.exercise.printButton")}
        </button>
      </div>
      {dialog}
    </div>
  );
}
