import type { JbdbExercise } from "../../../exercises.types";
import { JbdbUtils } from "@utils/jbdbUtils";


export const tableAddPracticeExercises: JbdbExercise[] =
  [
    {
      exId: "jbdb-add-2-3-4-5",
      description: "Ouzhpennañ 2, 3, 4, 5",
      translationId: "jbdb-add-2-3-4-5",
      shortTitle: "+2+3+4+5",
      exampleQuestion: `5 + 3 = ?`,
      logo: "exercice/calcul/additionner.png",
      duration: 180,
      exerciseNumber: 30,
      objectif: 100,
      eca: 50,

      calculAGenerer() {
        return JbdbUtils.add(9, 1, 2, 5);
      },  
    },
    {
      exId: "jbdb-add-6-7-8-9",
      description: "Ouzhpennañ 6, 7, 8, 9",
      translationId: "jbdb-add-6-7-8-9",
      shortTitle: "+6+7+8+9",
      exampleQuestion: `9 + 7 = ?`,
      logo: "exercice/calcul/additionner.png",
      duration: 180,
      exerciseNumber: 30,
      objectif: 100,
      eca: 50,

      calculAGenerer() {
        return JbdbUtils.add(9, 1, 6, 9);
      },  
    },
    {
      exId: "jbdb-add-all",
      description: "Taolioù sammañ",
      translationId: "jbdb-add-all",
      shortTitle: "an holl",
      exampleQuestion: `5 + 3 = ?`,
      logo: "exercice/calcul/additionner.png",
      duration: 180,
      exerciseNumber: 30,
      objectif: 100,
      eca: 50,

      calculAGenerer() {
        return JbdbUtils.add(9, 1, 2, 9);
      },  
    },
  ]
export const tableAddPracticeExerciseIds =
  tableAddPracticeExercises.map((exercise) => exercise.exId);

