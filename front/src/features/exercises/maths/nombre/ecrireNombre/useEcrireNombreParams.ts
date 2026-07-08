import { exerciseGeneriqueParamsReducer } from "@srcFront/features/exercises/core/exerciseGeneriqueParams.reducer";
import { useExercise } from "@srcFront/features/exercises/core/useExercise";
import { ecrireNombreParamsReducer } from "./ecrireNombreParams.reducer";
import { useMemo } from "react";
import { createGeneriqueParamsInitialState } from "@srcFront/features/exercises/core/exerciseGeneriqueParams.factory";
import { initialParamsGenerique } from "@srcFront/features/exercises/core/exerciseGeneriqueParams.defaults";
import { initialParamsSpecifique } from "./ecrireNombreParams.defaults";




export function useEcrireNombreParams() {


    //paramètres génériques de l'exercice
    //on peut définir d'autres paramètres par défaut en changeant la valeur de initialParamsGenerique
    const initalParamsGeneriqueDefaults = useMemo(
        () => createGeneriqueParamsInitialState(initialParamsGenerique),
        []
      );
    //création de la partie générique et de son reducer
    const [paramsGenerique, dispatchGenerique] = useExercise(
        exerciseGeneriqueParamsReducer(initalParamsGeneriqueDefaults),
        initalParamsGeneriqueDefaults,
      );

    //création de la partie spécifique et de son reducer
    //on peut définir d'autres paramètres par défaut en changeant la valeur de initialParamsSpecifique
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