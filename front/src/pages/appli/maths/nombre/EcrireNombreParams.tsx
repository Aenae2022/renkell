import ExerciseGeneriqueParams from "@components/appli/exercise/core/ExerciseGeneriqueParams";
import EcrireNombreParamsExercises from "@components/appli/exercise/nombre/ecrireNombre/EcrireNombreParamsExercises";
import { buttonStyle } from "@srcFront/librairies/buttonStyle";
import { useEcrireNombreParams } from "@srcFront/features/exercises/maths/nombre/ecrireNombre/useEcrireNombreParams";
import { Utilitaires } from "@utils/Utilitaires";
import { useTranslation } from "react-i18next";
import GenerateLink from "@components/appli/exercise/core/GenerateLink";

function EcrireNombreParams() {
  const { t } = useTranslation();
  const {
    paramsGenerique,
    paramsExercise,
    dispatchGenerique,
    dispatchExercise,
  } = useEcrireNombreParams();

  const handleCreateLink = () => {
    const params = [
      {
        key: "le",
        param: paramsGenerique.refLecon,
      },
      {
        key: "nbEx",
        param: paramsGenerique.nbExercice,
      },
      {
        key: "nbRp",
        param: paramsGenerique.nbReponse,
      },
      {
        key: "nbA",
        param: paramsGenerique.acquis,
      },
      {
        key: "nbPa",
        param: paramsGenerique.eca,
      },
      {
        key: "nbMin",
        param: paramsExercise.nbMin,
      },
      {
        key: "nbMax",
        param: paramsExercise.nbMax,
      },
      {
        key: "tLg",
        param: paramsExercise.typeLangue,
      },
      {
        key: "tQu",
        param: paramsExercise.typeQuestion,
      },
    ];

    const searchParams = new URLSearchParams();

    params.forEach(({ key, param }) => {
      const value = Utilitaires.validInputString(param.saisie);
      if (param.isValid && value !== param.default) {
        searchParams.append(key, value);
      }
    });

    const lien = `${window.location.origin}/nbre/ex/ecrire?${searchParams.toString()}`;

    dispatchGenerique({
      type: "SET_LINKGENERATED",
      value: lien,
    });
  };

  return (
    <>
      {paramsGenerique.linkGenerated !== "" && (
        <GenerateLink linkGenerated={paramsGenerique.linkGenerated} />
      )}
      <div>
        <button
          className={`${buttonStyle} mr-4 mb-4`}
          onClick={() => {
            dispatchGenerique({ type: "RESET" });
            dispatchExercise({ type: "RESET" });
          }}
        >
          {t("applies.generique.resetParams")}
        </button>
        <button className={`${buttonStyle} mb-4`} onClick={handleCreateLink}>
          {t("applies.generique.generateLink")}
        </button>
      </div>
      <ExerciseGeneriqueParams
        paramsGenerique={paramsGenerique}
        dispatchGenerique={dispatchGenerique}
        domaine="nombre"
      />
      <EcrireNombreParamsExercises
        paramsExercise={paramsExercise}
        dispatchExercise={dispatchExercise}
      />
    </>
  );
}

export default EcrireNombreParams;
