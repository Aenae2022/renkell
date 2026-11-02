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

export type Denombre1ItemData = {
  
    nbUnite : number,
    nbDizaine : number,
    nbCentaine : number,
    
  };


export type RepresentationKind = "unite" | "dizaine" | "centaine";
export type RepresentationImage = "normal" | "correction" | "group";

export type RepresentationType = {
  id: string;
  type: RepresentationKind;
  image: RepresentationImage;
  x: number;
  y: number;
  visible: boolean;
  isMoving?: boolean;
};

export type BaseSizeType = Record<
  RepresentationKind,
  {
    width: number;
    height: number;
    group : {
      modifX : number;
      modifY : number;
    }
  }
>;

export type BaseSrcType = Record<
  RepresentationKind,
  {
    src: Record<RepresentationImage, string>;
    alt: string;
  }
>;



export type Denombre1Action =
  | { type: "SET_REPONSE"; index: number; value: number}
  |  { type: "NEXT_ITEM"; index:number}
  | { type: "RESET" };