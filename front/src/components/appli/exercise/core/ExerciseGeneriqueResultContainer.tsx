import type {
  ExerciseGenerique,
  ExerciseGeneriqueState,
} from "@srcFront/features/exercises/core/exerciseGenerique.type";
import { useTranslation } from "react-i18next";
import ExerciseShowWork from "./ExerciseShowWork";
import Button from "@components/UI/Button";
import { useNavigate } from "react-router-dom";
import ExerciseGeneriqueResultPrint from "@srcFront/document/library/ExerciseGeneriqueResultPrint";
import { pdf } from "@react-pdf/renderer";
import { useNameDialog } from "@hook/useNameDialog";
import { useAuthStrict } from "@hook/useAuthStrict";
import { getAssetUrl } from "@utils/assetResolver";

type Props = {
  exercise: ExerciseGenerique;
  state: ExerciseGeneriqueState;
};

function ExerciseGeneriqueResultContainer({ exercise, state }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  //const user = useOutletContext<UserSessionConnectType>();
  const auth = useAuthStrict();

  const user = auth.status === "authenticated" ? auth.user : undefined;
  const { askName, dialog } = useNameDialog();

  const monScore = Math.round(
    (state.score /
      (exercise.params.config.nbExercice * exercise.params.config.nbReponse)) *
      100,
  );
  const monResultat: "parfait" | "acquis" | "eca" | "non acquis" =
    monScore === 100
      ? "parfait"
      : monScore >= exercise.params.config.acquis
        ? "acquis"
        : monScore >= exercise.params.config.eca
          ? "eca"
          : "non acquis";
  //définir le logo en fonction du résultat et des attentes
  let sourceLogo = "exercice/";
  const resultsScoreColorVariants = {
    neutral: "block relative text-center text-black z-30 text-5xl top-[-100px]",
    vert: "block relative text-center text-lime-500 z-30 text-5xl top-[-100px]",
    orange:
      "block relative text-center text-orange-600 z-30 text-5xl top-[-100px]",
    rouge: "block relative text-center text-red-600 z-30 text-5xl top-[-100px]",
  };
  const myResultColor = { color: "black" };
  let resultsScoreStyle =
    resultsScoreColorVariants[
      "neutral" as keyof typeof resultsScoreColorVariants
    ];
  let conseil = "";
  if (monResultat === "acquis" || monResultat === "parfait") {
    sourceLogo = sourceLogo + "laurierVert.png";
    myResultColor.color = "#22c55e";
    resultsScoreStyle =
      resultsScoreColorVariants[
        "vert" as keyof typeof resultsScoreColorVariants
      ];
    conseil = monResultat === "parfait" ? "conseilParfait" : "conseilAcquis";
  } else if (monResultat === "eca") {
    sourceLogo = sourceLogo + "laurierOrange.png";
    myResultColor.color = "#f59e0b";
    resultsScoreStyle =
      resultsScoreColorVariants[
        "orange" as keyof typeof resultsScoreColorVariants
      ];
    conseil = "conseilEca";
  } else {
    sourceLogo = sourceLogo + "laurierRouge.png";
    myResultColor.color = "#ef4444";
    resultsScoreStyle =
      resultsScoreColorVariants[
        "rouge" as keyof typeof resultsScoreColorVariants
      ];
    conseil = "conseilNonAcquis";
  }

  //création des tableaux de correction
  const nbLigneComplete = Math.trunc(exercise.params.config.nbExercice / 2);
  const nbLigneRestantes = exercise.params.config.nbExercice % 2;
  const indiceTableau2 =
    nbLigneRestantes == 0 ? nbLigneComplete : nbLigneComplete + 1;

  const tableau1 = state.items.slice(0, indiceTableau2);
  const tableau2 = state.items.slice(indiceTableau2);

  const nbToPush = tableau1.length - tableau2.length;
  const eltPush: number[] = [];
  for (let i = 0; i < nbToPush; i++) {
    eltPush.push(i + 1);
  }

  //fonction pour le bouton imprimer
  const generatePdf = async (name: string) => {
    const blob = await pdf(
      <ExerciseGeneriqueResultPrint
        name={name}
        sourceLogo={getAssetUrl(`pictures/${sourceLogo}`)}
        monScore={monScore}
        tableau1={tableau1}
        tableau2={tableau2}
        indiceTableau2={indiceTableau2}
        eltPush={eltPush}
        exercise={exercise}
        scoreColor={myResultColor}
        scoreLogo={sourceLogo}
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
    if (user) {
      generatePdf(`${user.userFirstName} ${user.userFamilyName}`);
    } else {
      const name = await askName();
      if (!name) return; // utilisateur a annulé
      generatePdf(name);
    }
  }

  return (
    <>
      <div className="mt-3">
        <img
          src={getAssetUrl(`pictures/${sourceLogo}`)}
          alt="laurier"
          className="w-48 block m-auto"
        />
        <div className={`${resultsScoreStyle}`}>{monScore}</div>
      </div>
      <div className="text-center mt-2">
        {t(`applies.ecrireNombre.${conseil}`)}
      </div>
      <ExerciseShowWork tableau1={tableau1} tableau2={tableau2} />
      <div className="flex justify-around mt-2">
        <Button onClick={() => window.location.reload()}>
          {t("main.restart")}
        </Button>
        <Button onClick={() => navigate("../../..", { relative: "path" })}>
          {t("main.exit")}
        </Button>
        <Button onClick={handlePrint}>
          {t("applies.generique.printResult")}
        </Button>
        {dialog}
      </div>
    </>
  );
}

export default ExerciseGeneriqueResultContainer;
