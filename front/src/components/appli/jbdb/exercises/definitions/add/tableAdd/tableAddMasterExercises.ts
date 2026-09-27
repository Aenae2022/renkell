import type { JbdbExercise } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";

const createTableAddExercise = (nb: number): JbdbExercise => {
  return {
    exId: `jbdb-add-toull-${nb}`,
    description: `Taolioù sammañ ${nb} gant toulloù `,
    translationId: `jbdb-add-toull-${nb}`,
    shortTitle: `+${nb}`,
    exampleQuestion: `? + ${nb} = ${nb+5}`,
    logo: "exercice/calcul/additionner.png",
    duration: 180,
    exerciseNumber: 30,
    objectif: 100,
    eca: 50,

    calculAGenerer() {
      return JbdbUtils.tableAddTrou(9, 1, nb, nb);
    },
  };
};

const exoTout = {
    exId: `jbdb-add-toull-all`,
    description: `Taolioù sammañ gant toulloù `,
    translationId: `jbdb-add-toull-all`,
    shortTitle: `an holl`,
    exampleQuestion: `? + 8 = 15`,
    logo: "exercice/calcul/additionner.png",
    duration: 180,
    exerciseNumber: 30,
    objectif: 100,
    eca: 50,

    calculAGenerer() {
      return JbdbUtils.tableAddTrou(9, 1, 2, 9);
    },
}

const tableAddNumbers = [2, 3, 4, 5, 6, 7, 8, 9];

export const tableAddMasterExercises: JbdbExercise[] =
 [ ...tableAddNumbers.map(createTableAddExercise),
  exoTout]

export const tableAddMasterExerciseIds =
  tableAddMasterExercises.map((exercise) => exercise.exId);

