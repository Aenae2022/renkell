import { useExercise } from "../../../core/useExercise.ts";
import { createDenombre1InitialState } from "./denombre1.factory.tsx";
import { useMemo } from "react";
import type { ExerciseGenerique, ExerciseGeneriqueConfig, ExerciseGeneriqueMeta } from "../../../core/exerciseGenerique.type.ts";
import { useUserConfig } from "../../../core/useUserConfig.ts";
import { useUserData } from "./useUserData.ts";
import type { Denombre1ExerciseData } from "./denombre1.types.ts";
import { exerciseGeneriqueReducer } from "../../../core/exerciseGenerique.reducer.ts";
import { denombre1Validator } from "./denombre1.Validator.ts";
import { initialParamsSpecifique } from "./Denombre1Params.defaults.ts";

export function useDenombre1(meta : ExerciseGeneriqueMeta) {
  const userParams: ExerciseGeneriqueConfig = useUserConfig()
    const userData : Denombre1ExerciseData = useUserData(initialParamsSpecifique);
    const exerciseDef : ExerciseGenerique<Denombre1ExerciseData>  = useMemo(() => {
      return {
        meta : meta,
        params : {
          config : userParams,
          userData : userData,
        }
      }
    }, [meta, userParams, userData]);
    //TODO
  const initialState = useMemo(
    () => createDenombre1InitialState(exerciseDef.params),
    [exerciseDef.params]
  );

  const [exercise, dispatch] = useExercise(
      exerciseGeneriqueReducer({
        validator: denombre1Validator,
        nbEssaisMax: exerciseDef.params.config.nbReponse,
      }),
      initialState
    );

  return {
    exercise : exerciseDef,
    state : exercise,
    dispatch,
  };
}