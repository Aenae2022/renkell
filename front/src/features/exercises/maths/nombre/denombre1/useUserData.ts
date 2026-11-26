import {  useSearchParams } from "react-router-dom";
import { verifParamsNumber } from "@utils/UtilsGetUrl";
import { Utilitaires } from "@utils/Utilitaires";
import type { Denombre1ExerciseData, Denombre1ExerciseParams } from "./denombre1.types";

export const useUserData = (initialParams: Denombre1ExerciseParams): Denombre1ExerciseData => {
  const [params] = useSearchParams();
  const nbMin = verifParamsNumber(params.get("nbMin"), Number(initialParams.nbMin.min), Number(initialParams.nbMin.max), Number(initialParams.nbMin.default));
  const nbMax = verifParamsNumber(params.get("nbMax"), Number(initialParams.nbMax.min), Number(initialParams.nbMax.max), Number(initialParams.nbMax.default));
  const verifMinMax = Utilitaires.compareTwoNumbers(nbMin, nbMax);
  const typeLangue = verifParamsNumber(params.get("tLg"), 1, 3, 1);
  const regroupement = verifParamsNumber(params.get("rgp"), 1, 2, 2);
  const typeQuestionParam = params.get("tQu")?.split(',');
  const typeQuestion = typeQuestionParam? isValid(typeQuestionParam)? typeQuestionParam : ['1'] : ['1'] 
  
  return {
      nMin: verifMinMax.nbMin,
      nMax: verifMinMax.nbMax,
      typeLangue: typeLangue,
      typeQuestion: typeQuestion,
      regroupement: regroupement,
  };
}

function isValid(values: string[]): boolean {
  const allowed = new Set(["1", "2", "3"]);
  const unique = new Set(values);

  return (
    unique.size === values.length && // pas de doublon
    [...unique].every((v) => allowed.has(v)) // uniquement les valeurs autorisées
  );
}