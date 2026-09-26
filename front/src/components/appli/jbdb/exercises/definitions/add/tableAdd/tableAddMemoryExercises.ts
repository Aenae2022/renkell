import type { JbdbExercise } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createTableAddExercise = (nb: number): JbdbExercise => {
  return {
    exId: `jbdb-add-${nb}`,
    description: `ouzhpennañ ${nb}`,
    translationId: `jbdb-add-${nb}`,
    shortTitle: `+${nb}`,
    exampleQuestion: `5 + ${nb} = ?`,
    logo: "exercice/calcul/additionner.png",
    duration: 180,
    exerciseNumber: 30,
    objectif: 100,
    eca: 50,

    calculAGenerer() {
      return JbdbUtils.add(9, 1, nb, nb);
    },
  };
};

const tableAddNumbers = [2, 3, 4, 5, 6, 7, 8, 9];

export const tableAddMemoryExercises: JbdbExercise[] =
  tableAddNumbers.map(createTableAddExercise);

export const tableAddMemoryExerciseIds =
  tableAddMemoryExercises.map((exercise) => exercise.exId);

