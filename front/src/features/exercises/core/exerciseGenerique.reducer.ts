
import type { ExerciseGeneriqueAction, ExerciseGeneriqueItem, ExerciseGeneriqueState } from "@srcFront/features/exercises/core/exerciseGenerique.type";
type ValidatorResult = {
  isCorrect: boolean;
  conseil: string;
  cleanedAnswer: string;
};

type ExerciseValidator<TItemData> = (
  answer: string,
  item: ExerciseGeneriqueItem<TItemData>,
) => ValidatorResult;

type ReducerDependencies<TItemData> = {
  validator: ExerciseValidator<TItemData>;
  nbEssaisMax?: number;
};
export const exerciseGeneriqueReducer = <TItemData>({ validator, nbEssaisMax = 2 }: ReducerDependencies<TItemData>) =>
(
  state: ExerciseGeneriqueState<TItemData>,
  action: ExerciseGeneriqueAction
): ExerciseGeneriqueState<TItemData> => {
  switch (action.type) {
    case "SET_REPONSE":   {
      const { index, value } = action;
      const item = state.items[index];

      
      const result =
          validator(value, item);
        
      const isCorrect = result.isCorrect;
      let newItemStatus = item.itemStatus;
      let score = 0;
      if(isCorrect){
        if(item.itemStatus === "question"){
          score = 2
          newItemStatus = "correction";
        } else if(item.itemStatus === "essai2"){
          score = 1
          newItemStatus = "correction";
        }
      } else {
        if(item.itemStatus === "question"){
          if(nbEssaisMax === 1){
            newItemStatus = "correction";
          } else {
            newItemStatus = "essai2";
          }
          
        } else if(item.itemStatus === "essai2"){
          newItemStatus = "correction";
        }
      }
      return {
        ...state,
        items: state.items.map((it, i) =>
          i === index
          ? {
            ...it,
            reponse: [...item.reponse, result.cleanedAnswer],
            isCorrect : isCorrect,
            itemStatus : newItemStatus,
            conseil: result.conseil,
          }
          : it
        ),
        score: state.score + score,
      };     
    }
    case "NEXT_ITEM":   {
      const { index} = action;
      const nextIndex = index + 1

      if(nextIndex >= state.items.length){
        return {
          ...state,
          status:"finished",
        }
      }
      
      return {
        ...state,
        indexItem:nextIndex,
      };     
    }
    
    default:
      return state;
  }
};

