export type Exercise<TState, TAction> = {
  exId: string;
  domaine: string;
  sousDomaine: string;
  logo: string;
  title : string;
  consigne: string;
  nbExercice : number;
  nbReponse : number;
  acquis : number;
  eca : number;
  state: TState;
  dispatch: React.Dispatch<TAction>;
};