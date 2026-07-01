import { exerciseGeneriqueParamsReducer } from "@srcFront/features/exercises/core/exerciseGeneriqueParams.reducer";
import { useExercise } from "@srcFront/features/exercises/core/useExercise";
import { ecrireNombreParamsReducer } from "./ecrireNombreParams.reducer";
import { useMemo } from "react";
import { createGeneriqueParamsInitialState } from "@srcFront/features/exercises/core/exerciseGeneriqueParams.factory";
import { initialParamsGenerique } from "@srcFront/features/exercises/core/exerciseGeneriqueParams.defaults";
import { initialParamsSpecifique } from "./ecrireNombreParams.defaults";




export function useEcrireNombreParams() {


    const initalParamsGeneriqueDefaults = useMemo(
        () => createGeneriqueParamsInitialState(initialParamsGenerique),
        []
      );
    const [paramsGenerique, dispatchGenerique] = useExercise(
        exerciseGeneriqueParamsReducer(initalParamsGeneriqueDefaults),
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