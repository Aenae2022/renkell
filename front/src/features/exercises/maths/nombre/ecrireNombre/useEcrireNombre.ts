import { useExercise } from "@features/exercises/core/useExercise";
import { useMemo } from "react";
import { createEcrireNombreInitialState } from "./ecrireNombre.factory.tsx";
import { ecrireNombreValidator } from "./ecrireNombre.validator.ts";
import { exerciseGeneriqueReducer } from "@srcFront/features/exercises/core/exerciseGenerique.reducer.ts";
import { useUserData } from "./useUserData.ts";
import type { ExerciseGenerique, ExerciseGeneriqueConfig, ExerciseGeneriqueMeta } from "@srcFront/features/exercises/core/exerciseGenerique.type.ts";
import type { EcrireNombreExerciseData } from "./ecrireNombre.type.ts";
import { useUserConfig } from "@srcFront/features/exercises/core/useUserConfig.ts";

export function useEcrireNombre(meta : ExerciseGeneriqueMeta) {

  const userParams: ExerciseGeneriqueConfig = useUserConfig()
  const userData : EcrireNombreExerciseData = useUserData();
  const exerciseDef : ExerciseGenerique<EcrireNombreExerciseData>  = useMemo(() => {
    return {
      meta : meta,
      params : {
        config : userParams,
        userData : userData,
      }
    }
  }, [meta, userParams, userData]);

  const initialState = useMemo(
    () => createEcrireNombreInitialState(exerciseDef.params),
    [exerciseDef.params]
  );

  const [exercise, dispatch] = useExercise(
    exerciseGeneriqueReducer({
      validator: ecrireNombreValidator,
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