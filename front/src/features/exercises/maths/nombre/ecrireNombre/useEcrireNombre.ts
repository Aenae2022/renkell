import { useExercise } from "@features/exercises/core/useExercise";
import { ecireNombreReducer } from "./ecrireNombre.reducer.ts";
import { useMemo } from "react";
import { ecrireNombreMeta } from "./ecrireNombre.meta.ts";
import { createEcrireNombreInitialState } from "./ecrireNombre.factory.tsx";

export function useEcrireNombre(n: number) {

  const initialState = useMemo(
    () => createEcrireNombreInitialState(n),
    [n]
  );

  const [exercise, dispatch] = useExercise(
    ecireNombreReducer,
    initialState
  );

  return {
    exercise : ecrireNombreMeta,
    state : exercise,
    dispatch,
  };
}