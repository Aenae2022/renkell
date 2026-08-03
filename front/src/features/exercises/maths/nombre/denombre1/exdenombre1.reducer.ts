import { type Denombre1State, type Denombre1Action} from "./denombre1.types";

export const denombre1Reducer = (
  state: Denombre1State,
  action: Denombre1Action
): Denombre1State => {
  switch (action.type) {
    case "SET_REPONSE":   {
      const { index, value } = action;
      const item = state.items[index];

      const newReponses = [...item.reponse, value];
      const isCorrect = value === item.correction.nb;
      let newItemStatus = item.itemStatus;

      console.log("essai n°",newReponses.length)
      console.log("valide ",isCorrect)
      if (isCorrect || newReponses.length === 2) {
        newItemStatus = "correction";
      } else {
        newItemStatus = "essai2"
      }

      return {
        ...state,
        items: state.items.map((it, i) =>
          i === index
          ? {
            ...it,
            reponse: newReponses,
            isCorrect : isCorrect,
            itemStatus : newItemStatus
          }
          : it
        ),
      };     
    }
    case "NEXT_ITEM":   {
      const { index} = action;
      const nextIndex = index + 1

      if(nextIndex >= state.items.length){
        return {
          ...state,
          status:"finish",
        }
      }
      
      return {
        ...state,
        indexItem:nextIndex,
      };     
    }
      

    case "RESET":
      return state;

    default:
      return state;
  }
};

