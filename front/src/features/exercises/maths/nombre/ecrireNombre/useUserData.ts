import {  useSearchParams } from "react-router-dom";
import type { EcrireNombreExerciseData } from "./ecrireNombre.type";
import { verifParamsNumber } from "@utils/UtilsGetUrl";
import { Utilitaires } from "@utils/Utilitaires";

export const useUserData = (): EcrireNombreExerciseData => {
  const [params] = useSearchParams();
  const nbMin = verifParamsNumber(params.get("nbMin"), 0, 999999999990, 100);
  const nbMax = verifParamsNumber(params.get("nbMax"), 2, 999999999999, 10000);
  const verifMinMax = Utilitaires.compareTwoNumbers(nbMin, nbMax);
  const typeLangue = verifParamsNumber(params.get("tLg"), 1, 3, 1);
  const typeQuestion = verifParamsNumber(params.get("tQu"), 1, 3, 1);
  
  return {
      nMin: verifMinMax.nbMin,
      nMax: verifMinMax.nbMax,
      typeLangue: typeLangue,
      typeQuestion: typeQuestion,
  };
}