import type { EcrireNombreExerciseParams, EcrireNombreParamsAction } from "./ecrireNombre.type";
import { initialParamsSpecifique } from "./ecrireNombreParams.defaults";

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
        nbMin: {
          ...state.nbMin,
          saisie: value
        }
      };
    }
    case "SET_NBMINVALID":   {
      const { value } = action;
      return {
        ...state,
        nbMin: {
          ...state.nbMin,
          isValid: value
        }
      };
    }
    case "SET_NBMAX":   {
      const { value } = action;
      return {
        ...state,
        nbMax: {
          ...state.nbMax,
          saisie: value
        },
      };
    }
    case "SET_NBMAXVALID":   {
      const { value } = action;
      return {
        ...state,
        nbMax: {
          ...state.nbMax,
          isValid: value,
        },
      };
    }
    case "SET_TYPELANGUE":   {
      const { value } = action;
      return {
        ...state,
        typeLangue: {
          ...state.typeLangue,
          saisie : value
        }
        }
      };
    case "SET_TYPEQUESTION":   {
      const { value } = action;
      return {
        ...state,
        typeQuestion: {
          ...state.typeQuestion,
          saisie : value
        }
      };
    }
    case "RESET": {
      return {
        ...initialParamsSpecifique
      }
    }
    default:
      return state;
  }
};

          
   

