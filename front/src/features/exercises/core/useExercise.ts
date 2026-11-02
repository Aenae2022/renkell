import { useReducer } from "react";

export function useExercise<TState, TAction>(
  reducer: (state: TState, action: TAction) => TState,
  initialState: TState
) {
  return useReducer(reducer, initialState);
}