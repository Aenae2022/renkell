export type EcrireNombreItem = {
  id: number;
  question: {
    model : string;
    toShow: React.ReactNode;
  };
  typeQuestion : number;
  typeLangue : string;
  reponse : string[];
  correction: {
    model : string;
    toShow: React.ReactNode;
  };
  isCorrect: boolean;
  itemStatus : string;
  conseil:string;
};



export type EcrireNombreState = {
  items: EcrireNombreItem[];
  status :string,
  indexItem : number,
};

export type EcrireNombreAction =
  | { type: "SET_REPONSE"; index: number; value: string}
  |  { type: "NEXT_ITEM"; index:number};