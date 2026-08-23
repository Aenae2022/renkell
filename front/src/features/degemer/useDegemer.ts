

export function useDegemer() {


    //datas school
    const school = useMemo(
        () => createSchoolState(),
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
        denombre1ParamsReducer(),
        initialParamsSpecifique
      );
    
    return{
        paramsGenerique :paramsGenerique, 
        paramsExercise : paramsExercise, 
        dispatchGenerique, 
        dispatchExercise
    }

    
}