export type Denombre1Item = {
  id: number;
  question: {
    nbUnite : number,
    nbDizaine : number,
    nbCentaine : number,
  };
  typeRepresentation : number,
  typeLangue : string,
  reponse: number[];
  correction: {
    nb: number;
    toShow: React.ReactNode;
  };
  isCorrect: boolean;
  itemStatus : "question" | "essai2" | "correction"
};

export type Cube = {
  id: string;
  type: "unite" | "dizaine" | "centaine";
  x: number;
  y: number;
  src: string;
  isMoving? : boolean;
};

export type Denombre1State = {
  items: Denombre1Item[];
  status :"run" | "finished",
  indexItem : number,
};

export type Denombre1Action =
  | { type: "SET_REPONSE"; index: number; value: number}
  |  { type: "NEXT_ITEM"; index:number}
  | { type: "RESET" };