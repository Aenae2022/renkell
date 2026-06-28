import type { EcrireNombreExerciseParams, EcrireNombreParamsAction } from "./ecrireNombre.type";

export const ecrireNombreParamsReducer = () =>
(
  state: EcrireNombreExerciseParams, //EcrireNombreState,
  action: EcrireNombreParamsAction
): EcrireNombreExerciseParams => {
  switch (action.type) {
    case "SET_NBMIN":   {
      const { value } = action;
      return {
        ...state,
        nbMin: value,
      };
    }
    case "SET_NBMAX":   {
      const { value } = action;
      return {
        ...state,
        nbMax: value,
      };
    }
    case "SET_TYPELANGUE":   {
      const { value } = action;
      return {
        ...state,
        typeLangue: value,
      };
    }
    case "SET_TYPEQUESTION":   {
      const { value } = action;
      return {
        ...state,
        typeQuestion: value,
      };
    }
    default:
      return state;
  }
};

          
   

