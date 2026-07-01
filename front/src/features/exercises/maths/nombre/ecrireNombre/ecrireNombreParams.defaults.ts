import type { EcrireNombreExerciseParams } from "./ecrireNombre.type";

export const initialParamsSpecifique  : EcrireNombreExerciseParams= {
        nbMin : {
            default : "1000",
            saisie : "1000",
            isValid : true,
        },
        nbMax : {
            default : "10000",
            saisie : "10000",
            isValid : true,
        },
        typeLangue : {
            default : "2",
            saisie : "2",
            isValid : true,
        },
        typeQuestion : {
            default : "3",
            saisie : "3",
            isValid : true,

        }   
    }