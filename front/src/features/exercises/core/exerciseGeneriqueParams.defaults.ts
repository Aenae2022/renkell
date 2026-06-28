import type { ExerciseGeneriqueParamsState } from "./exerciseGenerique.type";

export const initialParamsGenerique : ExerciseGeneriqueParamsState= {
        refLecon : {"saisie" : "", "default" : "", "isValid" : true},
        nbExercice : {"valeur" : "5", "saisie" : "5", "default" : "5", "isValid" : true},
        nbReponse : {"valeur" : "2", "saisie" : "2", "default" : "2", "isValid" : true},
        acquis : {"valeur" : "70", "saisie" : "70", "default" : "70", "isValid" : true},
        eca : {"valeur" : "40", "saisie" : "40", "default" : "40", "isValid" : true},
        linkGenerated : "",
    }