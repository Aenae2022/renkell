
export type ExerciseGenerique<TUserData = unknown> = {
    meta : ExerciseGeneriqueMeta;
  
  params: 
    {config: ExerciseGeneriqueConfig,
    userData: TUserData};

};

export type ExerciseGeneriqueMeta = {
    exId: string;
    domaine: string;
    sousDomaine: string;
    logo: string;
    title : string;
    consigne: string;
  }

export type ExerciseGeneriqueConfig = {
  refLecon : string;
  nbExercice : number;
  nbReponse : number;
  acquis : number;
  eca : number;
}



export type ExerciseGeneriqueItem<TItemData = unknown> = {
  id: number;
  question: {
    model : string;
    data : TItemData;
  };
  typeQuestion : number;
  typeLangue : string;
  reponse : string[];
  correction: {
    model : string;
    data : TItemData;
  };
  isCorrect: boolean;
  itemStatus: "question" | "essai2" | "correction";
  conseil:string;
};



export type ExerciseGeneriqueState<TItemData = unknown> = {
  items: ExerciseGeneriqueItem<TItemData>[];
  status :"run" | "finished";
  indexItem : number,
  score : number;
};

export type ExerciseGeneriqueParamsDefaults = {
  refLecon: string;
  nbExercice: string;
  nbReponse: string;
  acquis: string;
  eca: string;
};


export type ExerciseGeneriqueParamsState = {
  refLecon : {
    saisie : string;
    default : string;
    isValid : boolean;
  } 
  nbExercice : {
    saisie : string;
    default : string;
    isValid : boolean;
  } 
  nbReponse : {
    saisie : string;
    default : string;
    isValid : boolean;
  };
  acquis : {
    saisie : string;
    default : string;
    isValid : boolean;
  };
  eca : {
    saisie : string;
    default : string;
    isValid : boolean;
  };
  linkGenerated : string;
};

export type ExerciseGeneriqueAction =
  | { type: "SET_REPONSE"; index: number; value: string}
  |  { type: "NEXT_ITEM"; index:number};

export type ExerciseGeneriqueParamsAction =
  | { type: "SET_REFLECONSAISIE"; value: string}
  | { type: "SET_REFLECONVALID"; value: boolean}
  |  { type: "SET_NBEXERCICESAISIE"; value: string}
  |  { type: "SET_NBEXERCICEVALID"; value: boolean}
  |  { type: "SET_NBREPONSESAISIE"; value: string}
  |  { type: "SET_NBREPONSEVALID"; value: boolean}
  |  { type: "SET_ACQUISSAISIE"; value: string}
  |  { type: "SET_ACQUISVALID"; value: boolean}
  |  { type: "SET_ECASAISIE"; value: string}
  |  { type: "SET_ECAVALID"; value: boolean}
  |  { type: "SET_LINKGENERATED"; value: string}
  |  { type: "RESET" }