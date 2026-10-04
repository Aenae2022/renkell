import { tableAdditionExercises } from "./definitions/add/others/additionExercises";
import { decompositionNumberExercises } from "./definitions/add/others/decompositionNumber";
import { tableAddMasterExercises } from "./definitions/add/tableAdd/tableAddMasterExercises";
import { tableAddMemoryExercises } from "./definitions/add/tableAdd/tableAddMemoryExercises";
import { tableAddPracticeExercises } from "./definitions/add/tableAdd/tableAddPracticeExercises";
import { materCM1S1Exercises } from "./definitions/matEr/cm1/materCM1-S1";
import { materCM1S2Exercises } from "./definitions/matEr/cm1/materCM1-S2";
import { materCM1S3Exercises } from "./definitions/matEr/cm1/materCM1-S3";
import { materCM1S4Exercises } from "./definitions/matEr/cm1/materCM1-S4";
import { materCM2S1Exercises } from "./definitions/matEr/cm2/materCM2-S1";
import { materCM2S2Exercises } from "./definitions/matEr/cm2/materCM2-S2";
import { materCM2S3Exercises } from "./definitions/matEr/cm2/materCM2-S3";
import { materCM2S4Exercises } from "./definitions/matEr/cm2/materCM2-S4";
import type { JbdbExercise } from "./exercises.types";

const addExercises : JbdbExercise[] = [
    ...tableAddMemoryExercises,
    ...tableAddPracticeExercises,
    ...tableAddMasterExercises,
    ...tableAdditionExercises,
    ...decompositionNumberExercises,
]
const materCM1Exercises : JbdbExercise[] = [
    ...materCM1S1Exercises,
    ...materCM1S2Exercises,
    ...materCM1S3Exercises,
    ...materCM1S4Exercises,
]
const materCM2Exercises : JbdbExercise[] = [
    ...materCM2S1Exercises,
    ...materCM2S2Exercises,
    ...materCM2S3Exercises,
    ...materCM2S4Exercises
]

const allExercises: JbdbExercise[] = [
    ...addExercises,
    ...materCM1Exercises,
    ...materCM2Exercises,
];

export const exercisesRegistry = new Map<string, JbdbExercise>(
  allExercises.map((exercise) => [exercise.exId, exercise]),
);

export const findExerciseById = (
  exId: string,
): JbdbExercise | null => {
  return exercisesRegistry.get(exId) ?? null;
};