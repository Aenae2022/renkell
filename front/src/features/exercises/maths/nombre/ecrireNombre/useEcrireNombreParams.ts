import { exerciseGeneriqueParamsReducer } from "@srcFront/features/exercises/core/exerciseGeneriqueParams.reducer";
import { useExercise } from "@srcFront/features/exercises/core/useExercise";
import type { EcrireNombreExerciseParams } from "./ecrireNombre.type";
import { ecrireNombreParamsReducer } from "./ecrireNombreParams.reducer";
import { useMemo } from "react";
import { createGeneriqueParamsInitialState } from "@srcFront/features/exercises/core/exerciseGeneriqueParams.factory";
import { initialParamsGenerique } from "@srcFront/features/exercises/core/exerciseGeneriqueParams.defaults";


const initialParamsSpecifique  : EcrireNombreExerciseParams= {
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
        },
        typeQuestion : {
            default : "3",
            saisie : "3",
        }   
    }


export function useEcrireNombreParams() {


    const initalParamsGeneriqueDefaults = useMemo(
        () => createGeneriqueParamsInitialState(initialParamsGenerique),
        []
      );
    const [paramsGenerique, dispatchGenerique] = useExercise(
        exerciseGeneriqueParamsReducer(),
        initalParamsGeneriqueDefaults,
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