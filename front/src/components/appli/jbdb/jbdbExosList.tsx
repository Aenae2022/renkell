import { tableAdditionExerciseIds } from "./exercises/definitions/add/others/additionExercises";
import { decompositionNumberExerciseIds } from "./exercises/definitions/add/others/decompositionNumber";
import { tableAddMasterExerciseIds } from "./exercises/definitions/add/tableAdd/tableAddMasterExercises";
import { tableAddMemoryExerciseIds } from "./exercises/definitions/add/tableAdd/tableAddMemoryExercises";
import { tableAddPracticeExerciseIds } from "./exercises/definitions/add/tableAdd/tableAddPracticeExercises";
import { materCM1S1ExerciseIds } from "./exercises/definitions/matEr/cm1/materCM1-S1";
import { materCM1S2ExerciseIds } from "./exercises/definitions/matEr/cm1/materCM1-S2";
import { materCM1S3ExerciseIds } from "./exercises/definitions/matEr/cm1/materCM1-S3";
import { materCM1S4ExerciseIds } from "./exercises/definitions/matEr/cm1/materCM1-S4";
import { materCM2S1ExerciseIds } from "./exercises/definitions/matEr/cm2/materCM2-S1";
import { materCM2S2ExerciseIds } from "./exercises/definitions/matEr/cm2/materCM2-S2";
import { materCM2S3ExerciseIds } from "./exercises/definitions/matEr/cm2/materCM2-S3";
import { materCM2S4ExerciseIds } from "./exercises/definitions/matEr/cm2/materCM2-S4";


export const jbdbExosList = [
  {
    champs: "Sammañ ha dilemel",
    categories: [
      {
        //taolioù sammañ
        category: "tableAdd",
        subCategories: [
          {
            //eñvoriñ
            subCategory: "memory",
            exercises: tableAddMemoryExerciseIds,
          },
          {
            //pleustriñ
            subCategory: "practice",
            exercises: tableAddPracticeExerciseIds,
          },
          {
            //mestroniañ
            subCategory: "master",
            exercises: tableAddMasterExerciseIds,
          }
        ],
      },
      {
        //traoù all
        category: "others",
        subCategories: [
          {
            //sammañ
            subCategory: "addition",
            exercises: tableAdditionExerciseIds
          },
          {
            //disrannadenn
            subCategory: "decompositionNumber",
            exercises: decompositionNumberExerciseIds
          },
          {
            //dilemel
            subCategory: "subtraction",
            exercises:[]
          }
        ]
      }
      
    ],
  },
  {
    champs : "Mat er",
    categories: [
      {
        category: "matercm1",
        subCategories: [
          {
            //séquence 1
            subCategory: "matercm1sequence1",
            exercises : materCM1S1ExerciseIds,
          },
          {
            //séquence 2
            subCategory: "matercm1sequence2",
            exercises: materCM1S2ExerciseIds,
          },
          {
            //séquence 3
            subCategory: "matercm1sequence3",
            exercises: materCM1S3ExerciseIds,
          },
          {
            //séquence 4
            subCategory: "matercm1sequence4",
            exercises: materCM1S4ExerciseIds,
          }
        ]
      },
      {
        category: "matercm2",
        subCategories: [
          {
            //séquence 1
            subCategory: "matercm1sequence1",
            exercises : materCM2S1ExerciseIds,
          },
          {
            //séquence 2
            subCategory: "matercm2sequence2",
            exercises: materCM2S2ExerciseIds,
          },
          {
            //séquence 3
            subCategory: "matercm2sequence3",
            exercises: materCM2S3ExerciseIds,
          },
          {
            //séquence 4
            subCategory: "matercm2sequence4",
            exercises: materCM2S4ExerciseIds,
          }
        ]
      },
    ]
  },
];
