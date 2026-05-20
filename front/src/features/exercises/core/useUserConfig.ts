import { useSearchParams } from "react-router-dom";
import type { ExerciseGeneriqueConfig } from "./exerciseGenerique.type";
import { verifParamsNumber } from "@utils/UtilsGetUrl";
import { Utilitaires } from "@utils/Utilitaires";

export const useUserConfig = (): ExerciseGeneriqueConfig => {
  const [params] = useSearchParams();
  const leParam = params.get("le");
  const lecon = leParam !== null ? Utilitaires.validInputString(leParam) : "";
  const nbExercice = verifParamsNumber(params.get("nbEx"), 1, 10, 5);
  const nbReponse = verifParamsNumber(params.get("nbRp"), 1, 2, 2);
  const acquis = verifParamsNumber(params.get("nbA"), 0, 100, 70);
  const eca = verifParamsNumber(params.get("nbPa"), 0, 100, 40);
  return {
      refLecon: lecon,
      nbExercice: nbExercice,
      nbReponse: nbReponse,
      acquis: acquis,
      eca: eca,
  };
}