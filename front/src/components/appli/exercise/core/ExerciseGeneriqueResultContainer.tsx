import type { ExerciseGeneriqueState } from "@srcFront/features/exercises/core/exerciseGenerique.type";
import { useTranslation } from "react-i18next";
import ExerciseShowWork from "./ExerciseShowWork";
import Button from "@components/UI/Button";
//import { useNavigate } from "react-router-dom";

type Props = {
  exercise: {
    exId: string;
    domaine: string;
    sousDomaine: string;
    logo: string;
    title: string;
    consigne: string;
    nbExercice: number;
    acquis: number;
    eca: number;
    nbReponse: number;
  };
  state: ExerciseGeneriqueState;
};

function ExerciseGeneriqueResultContainer({ exercise, state }: Props) {
  const { t } = useTranslation();
  //const navigate = useNavigate();
  const monScore = Math.round(
    (state.score / (exercise.nbExercice * exercise.nbReponse)) * 100,
  );
  const monResultat: "parfait" | "acquis" | "eca" | "non acquis" =
    monScore === 100
      ? "parfait"
      : monScore >= exercise.acquis
        ? "acquis"
        : monScore >= exercise.eca
          ? "eca"
          : "non acquis";
  //définir le logo en fonction du résultat et des attentes
  let sourceLogo = "/src/assets/pictures/exercice/";
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
  let conseil = "";
  if (monResultat === "acquis" || monResultat === "parfait") {
    sourceLogo = sourceLogo + "laurierVert.png";
    resultsScoreStyle =
      resultsScoreColorVariants[
        "vert" as keyof typeof resultsScoreColorVariants
      ];
    conseil = monResultat === "parfait" ? "conseilParfait" : "conseilAcquis";
  } else if (monResultat === "eca") {
    sourceLogo = sourceLogo + "laurierOrange.png";
    resultsScoreStyle =
      resultsScoreColorVariants[
        "orange" as keyof typeof resultsScoreColorVariants
      ];
    conseil = "conseilEca";
  } else {
    sourceLogo = sourceLogo + "laurierRouge.png";
    resultsScoreStyle =
      resultsScoreColorVariants[
        "rouge" as keyof typeof resultsScoreColorVariants
      ];
    conseil = "conseilNonAcquis";
  }

  return (
    <>
      <div className="mt-3">
        <img src={sourceLogo} alt="laurier" className="w-48 block m-auto" />
        <div className={`${resultsScoreStyle}`}>{monScore}</div>
      </div>
      <div className="text-center mt-2">
        {t(`applies.ecrireNombre.${conseil}`)}
      </div>
      <ExerciseShowWork items={state.items} />
      <div className="flex justify-center mt-2">
        <Button onClick={() => window.location.reload()}>
          {t("main.restart")}
        </Button>
        {/* <button
          className={buttonStyle}
          onClick={() => navigate("..", { relative: "path" })}
        >
          {t("main.exit")}
        </button> */}
        {/* <button className={buttonStyle} onClick={handlePrint}>
          {t("jbdb.exercise.printButton")}
        </button> */}
      </div>
    </>
  );
}

export default ExerciseGeneriqueResultContainer;
