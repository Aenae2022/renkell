import { useExercise } from "@features/exercises/core/useExercise";
import { useMemo } from "react";
import { ecrireNombreMeta } from "./ecrireNombre.meta.ts";
import { createEcrireNombreInitialState } from "./ecrireNombre.factory.tsx";
import { ecrireNombreValidator } from "./ecrireNombre.validator.ts";
import { exerciseGeneriqueReducer } from "@srcFront/features/exercises/core/exerciseGenerique.reducer.ts";

export function useEcrireNombre(n: number) {

  const initialState = useMemo(
    () => createEcrireNombreInitialState(n),
    [n]
  );

  const [exercise, dispatch] = useExercise(
    exerciseGeneriqueReducer(ecrireNombreValidator),
    initialState
  );

  return {
    exercise : ecrireNombreMeta,
    state : exercise,
    dispatch,
  };
}