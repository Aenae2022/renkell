import type {
  EcrireNombreExerciseParams,
  EcrireNombreParamsAction,
} from "@srcFront/features/exercises/maths/nombre/ecrireNombre/ecrireNombre.type";
import React from "react";
type Props = {
  paramsExercise: EcrireNombreExerciseParams;
  dispatchExercise: React.Dispatch<EcrireNombreParamsAction>;
};

function EcrireNombreParamsExercises({
  paramsExercise,
  dispatchExercise,
}: Props) {
  const fieldsetStyle =
    "border-2 border-nombre-dark mb-2 ml-2 px-2 py-1 bg-white max-w-full overflow-x-auto rounded-md";
  const legendStyle =
    "border border-nombre rounded-2xl ml-3 p-2 text-[1.1em] bg-nombre/50";
  const inputStyle =
    "border-2 border-gray-300 rounded-md px-1 py-0.5 ml-2  w-[150px]";
  const inputStyleUnvalid =
    "border-2 border-red-500  rounded-md px-1 py-0.5 ml-2  bg-red-100";

  const handleChangeTypeLangue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatchExercise({ type: "SET_TYPELANGUESAISIE", value });
    const isValid = ["1", "2", "3"].includes(value);
    if (isValid) {
      dispatchExercise({ type: "SET_TYPELANGUE", value });
    } else {
      dispatchExercise({
        type: "SET_TYPELANGUE",
        value: paramsExercise.typeLangue.default,
      });
    }
    dispatchExercise({ type: "SET_TYPELANGUEVALID", value: isValid });
  };

  const divStyle = "mt-2";
  return (
    <div>
      <form>
        <fieldset className={fieldsetStyle}>
          <legend className={legendStyle}>
            Réglages spécifiques de l'exercice
          </legend>
          <div className={divStyle}>
            <label htmlFor="nbMin">Nombre minimum</label>
            <input
              className={inputStyle}
              type="number"
              id="nbMin"
              name="nbMin"
              value={paramsExercise.nbMin}
              min="1"
              max="100000000000"
              onChange={(e) =>
                dispatchExercise({
                  type: "SET_NBMIN",
                  value: e.target.value,
                })
              }
            />
            <label className="ml-6" htmlFor="nbMax">
              Nombre maximum
            </label>
            <input
              className={inputStyle}
              type="number"
              id="nbMax"
              name="nbMax"
              min="1"
              max="10"
              value={paramsExercise.nbMax}
              onChange={(e) =>
                dispatchExercise({
                  type: "SET_NBMAX",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className={divStyle}>
            <label htmlFor="typeLangue">Langue</label>
            <select
              className="border-2 border-gray-300 rounded-md px-1 py-0.5 ml-2"
              id="typeLangue"
              value={paramsExercise.typeLangue.default}
              onChange={handleChangeTypeLangue}
            >
              <option value="1">Breton</option>
              <option value="2">Français</option>
              <option value="3">Aléatoire</option>
            </select>
          </div>
          <div className={divStyle}>
            <label htmlFor="typeQuestion">Type de question</label>
            <select
              className="border-2 border-gray-300 rounded-md px-1 py-0.5 ml-2"
              id="typeQuestion"
              value={paramsExercise.typeQuestion}
              onChange={(e) =>
                dispatchExercise({
                  type: "SET_TYPEQUESTION",
                  value: e.target.value,
                })
              }
            >
              <option value="1">Ecrire en lettre</option>
              <option value="2">Ecrire en chiffre</option>
              <option value="3">Aléatoire</option>
            </select>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default EcrireNombreParamsExercises;
