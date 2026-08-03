import type {
  Denombre1ExerciseParams,
  Denombre1ParamsAction,
} from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.types";
import { Utilitaires } from "@utils/Utilitaires";
import React from "react";
import { useTranslation } from "react-i18next";
type Props = {
  paramsExercise: Denombre1ExerciseParams;
  dispatchExercise: React.Dispatch<Denombre1ParamsAction>;
};

function Denombre1ParamsExercises({ paramsExercise, dispatchExercise }: Props) {
  const { t } = useTranslation();

  const optionsTypeQuestion = [
    { value: "1", label: t("applies.denombre1.typeQuestion1") },
    { value: "2", label: t("applies.denombre1.typeQuestion2") },
    { value: "3", label: t("applies.denombre1.typeQuestion3") },
  ];

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
      Utilitaires.isIntegerInRange(
        cleanSaisie,
        Number(paramsExercise.nbMin.min),
        Number(paramsExercise.nbMin.max),
      ) && parseInt(cleanSaisie) < parseInt(paramsExercise.nbMax.saisie);
    const isValidNbMax =
      Utilitaires.isIntegerInRange(
        paramsExercise.nbMax.saisie,
        Number(paramsExercise.nbMax.min),
        Number(paramsExercise.nbMax.max),
      ) && parseInt(paramsExercise.nbMax.saisie) > parseInt(cleanSaisie);
    dispatchExercise({ type: "SET_NBMINVALID", value: isValid });
    dispatchExercise({ type: "SET_NBMAXVALID", value: isValidNbMax });
  };

  const handleChangeNbMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchExercise({ type: "SET_NBMAX", value });

    const cleanSaisie = Utilitaires.validInputString(value);
    const isValid =
      Utilitaires.isIntegerInRange(
        cleanSaisie,
        Number(paramsExercise.nbMax.min),
        Number(paramsExercise.nbMax.max),
      ) && parseInt(cleanSaisie) > parseInt(paramsExercise.nbMin.saisie);
    const isValidNbMin =
      Utilitaires.isIntegerInRange(
        paramsExercise.nbMin.saisie,
        Number(paramsExercise.nbMin.min),
        Number(paramsExercise.nbMin.max),
      ) && parseInt(paramsExercise.nbMin.saisie) < parseInt(cleanSaisie);
    dispatchExercise({ type: "SET_NBMAXVALID", value: isValid });
    dispatchExercise({ type: "SET_NBMINVALID", value: isValidNbMin });
  };

  const handleChangeTypeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    console.log("coucou", value, isChecked);
    const actualSelection = paramsExercise.typeQuestion.saisie;
    if (isChecked) {
      dispatchExercise({
        type: "SET_TYPEQUESTION",
        value: [...actualSelection, value],
      });
    } else {
      dispatchExercise({
        type: "SET_TYPEQUESTION",
        value: actualSelection.filter((v) => v !== value),
      });
    }
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
              {t("applies.generique.typeLangue")}
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
              {t("applies.denombre1.typeQuestion")}
            </label>
            {optionsTypeQuestion.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={paramsExercise.typeQuestion.saisie.includes(
                    option.value,
                  )}
                  onChange={handleChangeTypeQuestion}
                  className="form-checkbox h-4 w-4 text-blue-600"
                  value={option.value}
                />
                {option.label}
              </label>
            ))}
          </div>
          <div className={divStyle}>
            <label htmlFor="regroupement">
              {t("applies.denombre1.regroupement")}
            </label>
            <select
              className="border-2 border-gray-300 rounded-md px-1 py-0.5 ml-2"
              id="regroupement"
              value={paramsExercise.regroupement.saisie}
              onChange={(e) =>
                dispatchExercise({
                  type: "SET_REGROUPEMENT",
                  value: e.target.value,
                })
              }
            >
              <option value="1">{t("applies.denombre1.regroupement1")}</option>
              <option value="2">{t("applies.denombre1.regroupement2")}</option>
            </select>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Denombre1ParamsExercises;
