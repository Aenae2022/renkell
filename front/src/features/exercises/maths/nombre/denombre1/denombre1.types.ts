export type Denombre1ExerciseParams={
    nbMin : {
        default : string;
        saisie : string;
        isValid : boolean;
        min: string;
        max: string;
    }
    nbMax : {
        default : string;
        saisie : string;
        isValid : boolean;
        min: string;
        max: string;
    }
    typeLangue : {// 1 : breton, 2 : français, 3 : aléatoire
        default : string;
        saisie : string;
        isValid : boolean;
    }
    typeQuestion : {
         default : string[], //1 : cubes, 2 : monnaie, 3: unités
            saisie : string[],
            isValid : boolean,
        },
        regroupement : {
            default : string, //1 : non, 2 oui
            saisie : string,
            isValid : boolean,
        },
}

export type Denombre1ParamsAction =
  | { type: "SET_NBMIN"; value: string}
  | { type: "SET_NBMINVALID"; value: boolean}
  |  { type: "SET_NBMAX"; value: string}
  | { type: "SET_NBMAXVALID"; value: boolean}  
  |  { type: "SET_TYPELANGUE"; value: string}
  |  { type: "SET_TYPEQUESTION"; value: string[]}
  |  { type: "SET_REGROUPEMENT"; value: string}
  |  { type: "RESET" }

export type Denombre1ExerciseData={
    nMin : number;
    nMax : number;
    typeLangue : number; // 1 : breton, 2 : français, 3 : aléatoire
    typeQuestion : string[]; //1 : cube, 2 : monnaie, 3: unités
    regroupement : number; //1 : sans regroupement, 2 : avec regroupement
};
// export type Denombre1Item = {
//   id: number;
//   question: {
//     nbUnite : number,
//     nbDizaine : number,
//     nbCentaine : number,
//   };
//   typeRepresentation : number,
//   typeLangue : string,
//   reponse: number[];
//   correction: {
//     nb: number;
//     toShow: React.ReactNode;
//   };
//   isCorrect: boolean;
//   itemStatus : "question" | "essai2" | "correction"
// };

export type Denombre1ItemData = {
  
    nbUnite : number,
    nbDizaine : number,
    nbCentaine : number,
    
  };


export type Cube = {
  id: string;
  type: "unite" | "dizaine" | "centaine";
  image : "normal" | "correction" | "group";
  x: number;
  y: number;
  visible: boolean;
  isMoving? : boolean;
};

// export type Denombre1State = {
//   items: Denombre1Item[];
//   status :"run" | "finished",
//   indexItem : number,
// };

export type Denombre1Action =
  | { type: "SET_REPONSE"; index: number; value: number}
  |  { type: "NEXT_ITEM"; index:number}
  | { type: "RESET" };