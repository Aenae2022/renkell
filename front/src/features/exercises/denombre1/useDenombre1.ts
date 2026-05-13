import { useExercise } from "../core/useExercise";
import { denombre1Reducer } from "./denombre1.reducer";
import { createDenombre1InitialState } from "./denombre1.factory.tsx";
import { denombre1Meta } from "./denombre1.meta";
import { useMemo } from "react";

export function useDenombre1(n: number) {

  const initialState = useMemo(
    () => createDenombre1InitialState(n),
    [n]
  );

  const [exercise, dispatch] = useExercise(
    denombre1Reducer,
    initialState
  );

  return {
    exercise : denombre1Meta,
    state : exercise,
    dispatch,
  };
}