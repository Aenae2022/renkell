import type { Denombre1ExerciseParams } from "./denombre1.types";

export const initialParamsSpecifique  : Denombre1ExerciseParams= {
        nbMin : {
            default : "1",
            saisie : "1",
            isValid : true,
            min:"1",
            max:"990",
        },
        nbMax : {
            default : "1000",
            saisie : "1000",
            isValid : true,
            min:"9",
            max:"1000",

        },
        typeLangue : {
            default : "2", //1 : breton, 2 français, 3 aléatoire
            saisie : "2",
            isValid : true,
        },
        typeQuestion : {
            default : ["1"], //1 : cubes, 2 : monnaie, 3: unités
            saisie : ["1"],
            isValid : true,
        },
        regroupement : {
            default : "2", //1 : non, 2 oui
            saisie : "2",
            isValid : true,
        },
    }