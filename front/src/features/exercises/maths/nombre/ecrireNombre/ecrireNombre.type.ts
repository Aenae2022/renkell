
export type EcrireNombreExerciseData={
    nMin : number;
    nMax : number;
    typeLangue : number; // 1 : breton, 2 : français, 3 : aléatoire
    typeQuestion : number; // 1 : chiffre -> lettre, 2 : lettre -> chiffre, 3 : aléatoire
}

export type EcrireNombreItemData = {
    model: string;
    type: string;
}[]

export type EcrireNombreExerciseParams={
    nbMin : {
        default : string;
        saisie : string;
        isValid : boolean;
    }
    nbMax : {
        default : string;
        saisie : string;
        isValid : boolean;
    }
    typeLangue : {// 1 : breton, 2 : français, 3 : aléatoire
        default : string;
        saisie : string;
        isValid : boolean;
    }
    typeQuestion : {// 1 : chiffre -> lettre, 2 : lettre -> chiffre, 3 : aléatoire
        default : string;
        saisie : string;
        isValid: boolean;
    } 
    
}

export type EcrireNombreParamsAction =
  | { type: "SET_NBMIN"; value: string}
  | { type: "SET_NBMINVALID"; value: boolean}
  |  { type: "SET_NBMAX"; value: string}
  | { type: "SET_NBMAXVALID"; value: boolean}  
  |  { type: "SET_TYPELANGUE"; value: string}
  |  { type: "SET_TYPEQUESTION"; value: string}
  |  { type: "RESET" }
