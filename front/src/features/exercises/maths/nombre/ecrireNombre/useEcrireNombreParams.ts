import { exerciseGeneriqueParamsReducer } from "@srcFront/features/exercises/core/exerciseGeneriqueParams.reducer";
import { useExercise } from "@srcFront/features/exercises/core/useExercise";
import type { EcrireNombreExerciseParams } from "./ecrireNombre.type";
import { ecrireNombreParamsReducer } from "./ecrireNombreParams.reducer";
import { initialParamsGenerique } from "@srcFront/features/exercises/core/exerciseGeneriqueParams.defaults";


const initialParamsSpecifique  : EcrireNombreExerciseParams= {
        nbMin : {
            default : "1000",
            valeur : "1000",
            saisie : "1000",
            isValid : true,
        },
        nbMax : {
            default : "10000",
            valeur : "10000",
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


export function useEcrireNombreParams() {


    const [paramsGenerique, dispatchGenerique] = useExercise(
        exerciseGeneriqueParamsReducer(),
        initialParamsGenerique,
      );

    const [paramsExercise, dispatchExercise] = useExercise(
        ecrireNombreParamsReducer(),
        initialParamsSpecifique
      );
    
    return{
        paramsGenerique :paramsGenerique, 
        paramsExercise : paramsExercise, 
        dispatchGenerique, 
        dispatchExercise
    }

    
}