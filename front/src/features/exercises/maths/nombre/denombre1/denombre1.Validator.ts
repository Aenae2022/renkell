import { Utilitaires } from "@utils/Utilitaires";
import DOMPurify from "dompurify";
import type { ExerciseGeneriqueItem } from "@srcFront/features/exercises/core/exerciseGenerique.type";
import type { Denombre1ItemData } from "./denombre1.types";
// import type { EcrireNombreExerciseData } from "./ecrireNombre.type";
type ValidatorResult = {
  isCorrect: boolean;
  conseil: string;
  cleanedAnswer: string;
};


export const denombre1Validator = (
    value : string,
    item : ExerciseGeneriqueItem<Denombre1ItemData>
) : ValidatorResult => {
    const secureStr = DOMPurify.sanitize(value)

    const clearResponse = Utilitaires.validInputString(secureStr)
    let result = {isCorrect : false, conseil:""}
    
    result = isCorrectResponse(clearResponse, item.correction.model)
    
    return {
        isCorrect : result.isCorrect,
        conseil : result.conseil,
        cleanedAnswer : clearResponse,
    }
};


function isCorrectResponse(reponse:string, correction:string) : {isCorrect : boolean, conseil:string} {
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

