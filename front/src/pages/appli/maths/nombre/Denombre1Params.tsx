import ExerciseGeneriqueParams from "@components/appli/exercise/core/ExerciseGeneriqueParams";
import { buttonStyle } from "@srcFront/librairies/buttonStyle";
import { Utilitaires } from "@utils/Utilitaires";
import { useTranslation } from "react-i18next";
import GenerateLink from "@components/appli/exercise/core/GenerateLink";
import { useDenombre1Params } from "@srcFront/features/exercises/maths/nombre/denombre1/useDenombre1Params";
import Denombre1ParamsExercises from "@components/appli/exercise/nombre/denombre1/Denombre1ParamsExercises";

function Denombre1Params() {
  const { t } = useTranslation();
  const {
    paramsGenerique,
    paramsExercise,
    dispatchGenerique,
    dispatchExercise,
  } = useDenombre1Params();

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
      {
        key: "rgp",
        param: paramsExercise.regroupement,
      },
    ];

    const searchParams = new URLSearchParams();

    params.forEach(({ key, param }) => {
      let valueToUse = param.saisie;
      if (Array.isArray(valueToUse)) {
        valueToUse = valueToUse.join(",");
      }
      const value = Utilitaires.validInputString(valueToUse);
      if (param.isValid && value !== param.default) {
        searchParams.append(key, value);
      }
    });

    const lien = `${window.location.origin}/nbre/ex/den1?${searchParams.toString()}`;

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
      <Denombre1ParamsExercises
        paramsExercise={paramsExercise}
        dispatchExercise={dispatchExercise}
      />
    </>
  );
}

export default Denombre1Params;
