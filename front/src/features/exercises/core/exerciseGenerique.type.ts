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

export type ExerciseGeneriqueItem = {
  id: number;
  question: {
    model : string;
    type : string;
    data : {model : string; type : string}[];
  };
  typeQuestion : number;
  typeLangue : string;
  reponse : string[];
  correction: {
    model : string;
    type : string;
    data : {model : string; type : string}[];
  };
  isCorrect: boolean;
  itemStatus: "question" | "essai2" | "correction";
  conseil:string;
};



export type ExerciseGeneriqueState = {
  items: ExerciseGeneriqueItem[];
  status :"run" | "finished";
  indexItem : number,
  score : number;
};

export type ExerciseGeneriqueAction =
  | { type: "SET_REPONSE"; index: number; value: string}
  |  { type: "NEXT_ITEM"; index:number};