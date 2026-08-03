import type { Denombre1ExerciseParams, Denombre1ParamsAction } from "./denombre1.types";
import { initialParamsSpecifique } from "./Denombre1Params.defaults";

export const denombre1ParamsReducer = () =>
(
  state: Denombre1ExerciseParams, //EcrireNombreState,
  action: Denombre1ParamsAction
): Denombre1ExerciseParams => {
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
    case "SET_REGROUPEMENT":   {
      const { value } = action;
      return {
        ...state,
        regroupement: {
          ...state.regroupement,
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

          
   

