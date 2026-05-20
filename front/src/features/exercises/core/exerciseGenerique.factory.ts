import type { EcrireNombreExerciseData } from "../maths/nombre/ecrireNombre/ecrireNombre.type";
import type { ExerciseGenerique, ExerciseGeneriqueConfig, ExerciseGeneriqueMeta } from "./exerciseGenerique.type";

export const createExerciseGeneriqueInitialState = (meta: ExerciseGeneriqueMeta, 
    config: ExerciseGeneriqueConfig, 
    userData: EcrireNombreExerciseData)
    : ExerciseGenerique => ({
  meta : meta,
  params : 
  {
    config : config,
  userData : userData,
  } 
});