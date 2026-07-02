import { Utilitaires } from "@utils/Utilitaires";
import DOMPurify from "dompurify";
import type { ExerciseGeneriqueItem } from "@srcFront/features/exercises/core/exerciseGenerique.type";
type ValidatorResult = {
  isCorrect: boolean;
  conseil: string;
  cleanedAnswer: string;
};


export const ecrireNombreValidator = (
    value : string,
    item : ExerciseGeneriqueItem
) : ValidatorResult => {
    const secureStr = DOMPurify.sanitize(value)

    const clearResponse = Utilitaires.validInputString(secureStr)
    let result = {isCorrect : false, conseil:""}
    
    if(item.typeQuestion === 1){
        result = isCorrectResponse1(clearResponse, item.correction.model)
    } 
    else {
        result = isCorrectResponse2(clearResponse, item.correction.model)
    }
      
    return {
        isCorrect : result.isCorrect,
        conseil : result.conseil,
        cleanedAnswer : clearResponse,
    }
};

function isCorrectResponse1(reponse:string, correction:string) : {isCorrect : boolean, conseil:string} {
  //réponse en lettres
  if(reponse.toLowerCase() === correction.toLowerCase()){
    return {isCorrect:true, conseil:""}
  }
  else {
    const reponseFlexible = normalizeFlexible(reponse)
    const correctionFlexible = normalizeFlexible(correction)  
    if(reponseFlexible === correctionFlexible){
      return {isCorrect:false, conseil:"applies.ecrireNombre.conseil1"}
    }
  }
  return{isCorrect:false, conseil:""}
}

function isCorrectResponse2(reponse:string, correction:string) : {isCorrect : boolean, conseil:string} {
  //réponse en chiffres
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