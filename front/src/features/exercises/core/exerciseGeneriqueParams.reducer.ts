import type { ExerciseGeneriqueParamsAction, ExerciseGeneriqueParamsState } from "./exerciseGenerique.type";

export const exerciseGeneriqueParamsReducer = (defaultState : ExerciseGeneriqueParamsState) =>
(
  state: ExerciseGeneriqueParamsState, //EcrireNombreState,
  action: ExerciseGeneriqueParamsAction
): ExerciseGeneriqueParamsState => {
  switch (action.type) {
    // case "SET_REFLECON":   {
    //   const { value } = action;
      
    //   return {
    //     ...state,
    //     refLecon: {
    //       ...state.refLecon,
    //       valeur: value
    //     }
    //   };
    // }
    case "SET_REFLECONSAISIE":   {
      const { value } = action;
      
      return {
        ...state,
        refLecon: {
          ...state.refLecon,
          saisie: value
        }
      };
    }
    case "SET_REFLECONVALID":   {
      const { value } = action;
      return {
        ...state,
        refLecon: {
          ...state.refLecon,
          isValid: value}
      };
    }
    // case "SET_NBEXERCICE":   {
    //   const { value } = action;
    //   return {
    //     ...state,
    //     nbExercice: {
    //       ...state.nbExercice,
    //       valeur: value
    //     }
    //   };
    // }
    case "SET_NBEXERCICESAISIE":   {
      const { value } = action;
      return {
        ...state,
        nbExercice: {
          ...state.nbExercice,
          saisie: value
        }
      };
    }
    case "SET_NBEXERCICEVALID":   {
      const { value } = action;
      return {
        ...state,
        nbExercice: {
          ...state.nbExercice,
          isValid: value
        }
      };
    }
    // case "SET_NBREPONSE":   {
    //   const { value } = action;
    //   return {
    //     ...state,
    //     nbReponse: {
    //       ...state.nbReponse,
    //       valeur: value},
    //   };
    // }
    case "SET_NBREPONSESAISIE":   {
      const { value } = action;
      return {
        ...state,
        nbReponse: {
          ...state.nbReponse,
          saisie: value
        }
      };
    }
    case "SET_NBREPONSEVALID":   {
      const { value } = action;
      return {
        ...state,
        nbReponse: {
          ...state.nbReponse,
          isValid: value
        }
      };
    }
    // case "SET_ACQUIS":   {
    //   const { value } = action;
    //   return {
    //     ...state,
    //     acquis: {
    //       ...state.acquis,
    //       valeur: value
    //     }
    //   };
    // }
    case "SET_ACQUISSAISIE":   {
      const { value } = action;
      return {
        ...state,
        acquis: {
          ...state.acquis,
          saisie: value
        }
      };
    }
    case "SET_ACQUISVALID":   {
      const { value } = action;
      return {
        ...state,
        acquis: {
          ...state.acquis,
          isValid: value
        }
      };
    }
    // case "SET_ECA":   {
    //   const { value } = action;
    //   return {
    //     ...state,
    //     eca: {
    //       ...state.eca,
    //       valeur: value
    //     }
    //   };
    // }
    case "SET_ECASAISIE":   {
      const { value } = action;
      return {
        ...state,
        eca: {
          ...state.eca,
          saisie: value
        }
      };
    }
    case "SET_ECAVALID":   {
      const { value } = action;
      return {
        ...state,
        eca: {
          ...state.eca,
          isValid: value
        }
      };
    }
    case "SET_LINKGENERATED":   {
      const { value } = action;
      return {
        ...state,
        linkGenerated: value,
      };
    }
    case "RESET": {
      
      return {
        ...defaultState,}
      }

    default:
      return state;
  }
};

          
   

