import { Utilitaires } from "@utils/Utilitaires";
import type { EcrireNombreAction, EcrireNombreState } from "./ecrireNombre.types";
import DOMPurify from "dompurify";

export const ecireNombreReducer = (
  state: EcrireNombreState,
  action: EcrireNombreAction
): EcrireNombreState => {
  switch (action.type) {
    case "SET_REPONSE":   {
      const { index, value } = action;
      const item = state.items[index];

      const secureStr = DOMPurify.sanitize(value)
      const newReponses = [...item.reponse, secureStr];

      const clearResponse = Utilitaires.validInputString(secureStr)
      let result = {isCorrect : false, conseil:""}
      //si réponse en lettres
      if(item.typeQuestion === 1){
        result = isCorrectResponse1(clearResponse, item.correction.model)
      } else {
        result = isCorrectResponse2(clearResponse, item.correction.model)
      }
      //si réponse en chiffres
      const isCorrect = result.isCorrect;
      let newItemStatus = item.itemStatus;

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
            itemStatus : newItemStatus,
            conseil: result.conseil,
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
    
    default:
      return state;
  }
};

function isCorrectResponse1(reponse:string, correction:string) : {isCorrect : boolean, conseil:string} {
  //réponse en lettres
  if(reponse === correction){
    return {isCorrect:true, conseil:""}
  }
  else {
    // if(langue==="fr"){
    //   const correctionModif = correction
    //     .replace(/-/g, ' ')
    //     if(correctionModif === reponse){
    //       return {isCorrect:false, conseil:"applies.ecrireNombre.conseil1"}
    //     }
    // }
    const reponseFlexible = normalizeFlexible(reponse)
    const correctionFlexible = normalizeFlexible(correction)  
    if(reponseFlexible === correctionFlexible){
      return {isCorrect:false, conseil:"applies.ecrireNombre.conseil1"}
    }
  }
  return{isCorrect:false, conseil:""}
}

function isCorrectResponse2(reponse:string, correction:string) : {isCorrect : boolean, conseil:string} {
  //réponse en lettres
  if(reponse === correction){
    return {isCorrect:true, conseil:""}
  }
  else {
    const correctionModif = correction
        .replace(/\s/, '')
        if(correctionModif === reponse){
          return {isCorrect:false, conseil:"applies.ecrireNombre.conseil2"}
        }
    
  }
  return{isCorrect:false, conseil:""}
}

function normalizeFlexible(str:string) : string {
  return str
    // espaces et tirets deviennent identiques
    .replace(/[-\s]+/g, " ")
}