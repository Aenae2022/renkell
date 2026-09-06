import type {
  EcrireNombreExerciseParams,
  EcrireNombreParamsAction,
} from "@srcFront/features/exercises/maths/nombre/ecrireNombre/ecrireNombre.type";
import { Utilitaires } from "@utils/Utilitaires";
import React from "react";
import { useTranslation } from "react-i18next";
type Props = {
  paramsExercise: EcrireNombreExerciseParams;
  dispatchExercise: React.Dispatch<EcrireNombreParamsAction>;
};

function EcrireNombreParamsExercises({
  paramsExercise,
  dispatchExercise,
}: Props) {
  const { t } = useTranslation();
  const fieldsetStyle =
    "border-2 border-nombre-dark mb-2 ml-2 px-2 py-1 bg-white max-w-full overflow-x-auto rounded-md";
  const legendStyle =
    "border border-nombre rounded-2xl ml-3 p-2 text-[1.1em] bg-nombre/50";
  const inputStyle =
    "border-2 border-gray-300 rounded-md px-1 py-0.5 ml-2  w-[150px]";
  const inputStyleUnvalid =
    "border-2 border-red-500  rounded-md px-1 py-0.5 ml-2  bg-red-100 w-[150px]";

  const divStyle = "mt-2";

  const handleChangeNbMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchExercise({ type: "SET_NBMIN", value });

    const cleanSaisie = Utilitaires.validInputString(value);
    const isValid =
      Utilitaires.isIntegerInRange(cleanSaisie, 1, 1_000_000_000) &&
      parseInt(cleanSaisie) < parseInt(paramsExercise.nbMax.saisie);
    const isValidNbMax =
      Utilitaires.isIntegerInRange(
        paramsExercise.nbMax.saisie,
        1,
        1_000_000_000,
      ) && parseInt(paramsExercise.nbMax.saisie) > parseInt(cleanSaisie);
    dispatchExercise({ type: "SET_NBMINVALID", value: isValid });
    dispatchExercise({ type: "SET_NBMAXVALID", value: isValidNbMax });
  };

  const handleChangeNbMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchExercise({ type: "SET_NBMAX", value });

    const cleanSaisie = Utilitaires.validInputString(value);
    const isValid =
      Utilitaires.isIntegerInRange(cleanSaisie, 1, 1_000_000_000) &&
      parseInt(cleanSaisie) > parseInt(paramsExercise.nbMin.saisie);
    const isValidNbMin =
      Utilitaires.isIntegerInRange(
        paramsExercise.nbMin.saisie,
        1,
        1_000_000_000,
      ) && parseInt(paramsExercise.nbMin.saisie) < parseInt(cleanSaisie);
    dispatchExercise({ type: "SET_NBMAXVALID", value: isValid });
    dispatchExercise({ type: "SET_NBMINVALID", value: isValidNbMin });
  };

  return (
    <div>
      <form>
        <fieldset className={fieldsetStyle}>
          <legend className={legendStyle}>
            {t("applies.generique.exerciseSettings")}
          </legend>
          <div className={divStyle}>
            <label htmlFor="nbMin">{t("applies.ecrireNombre.nbMin")}</label>
            <input
              className={`${
                paramsExercise.nbMin.isValid ? inputStyle : inputStyleUnvalid
              }`}
              type="text"
              id="nbMin"
              name="nbMin"
              value={paramsExercise.nbMin.saisie}
              onChange={handleChangeNbMin}
            />
            <label className="ml-6" htmlFor="nbMax">
              {t("applies.ecrireNombre.nbMax")}
            </label>
            <input
              className={`${
                paramsExercise.nbMax.isValid ? inputStyle : inputStyleUnvalid
              }`}
              type="text"
              id="nbMax"
              name="nbMax"
              min="1"
              max="10"
              value={paramsExercise.nbMax.saisie}
              onChange={handleChangeNbMax}
            />
          </div>
          <div className={divStyle}>
            <label htmlFor="typeLangue">
              {t("applies.ecrireNombre.typeLangue")}
            </label>
            <select
              className="border-2 border-gray-300 rounded-md px-1 py-0.5 ml-2"
              id="typeLangue"
              value={paramsExercise.typeLangue.saisie}
              onChange={(e) =>
                dispatchExercise({
                  type: "SET_TYPELANGUE",
                  value: e.target.value,
                })
              }
            >
              <option value="1">{t("applies.generique.typeLangue1")}</option>
              <option value="2">{t("applies.generique.typeLangue2")}</option>
              <option value="3">{t("applies.generique.aleatoire")}</option>
            </select>
          </div>
          <div className={divStyle}>
            <label htmlFor="typeQuestion">
              {t("applies.ecrireNombre.typeQuestion")}
            </label>
            <select
              className="border-2 border-gray-300 rounded-md px-1 py-0.5 ml-2"
              id="typeQuestion"
              value={paramsExercise.typeQuestion.saisie}
              onChange={(e) =>
                dispatchExercise({
                  type: "SET_TYPEQUESTION",
                  value: e.target.value,
                })
              }
            >
              <option value="1">
                {t("applies.ecrireNombre.typeQuestion1")}
              </option>
              <option value="2">
                {t("applies.ecrireNombre.typeQuestion2")}
              </option>
              <option value="3">{t("applies.generique.aleatoire")}</option>
            </select>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default EcrireNombreParamsExercises;
