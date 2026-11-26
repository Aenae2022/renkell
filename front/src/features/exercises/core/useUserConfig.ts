import { useSearchParams } from "react-router-dom";
import type { ExerciseGeneriqueConfig } from "./exerciseGenerique.type";
import { verifParamsNumber } from "@utils/UtilsGetUrl";
import { Utilitaires } from "@utils/Utilitaires";
import { refLeconSchema } from "@shared/schema/fields/refLecon.schema";

export const useUserConfig = (): ExerciseGeneriqueConfig => {
  const [params] = useSearchParams();
  const leParam = params.get("le");
  const parsedLeParam = leParam !== null ? refLeconSchema.safeParse(Utilitaires.validInputString(leParam)) : { success: false, data: "" };
  const lecon = parsedLeParam.success ? parsedLeParam.data : "";
  const nbExercice = verifParamsNumber(params.get("nbEx"), 1, 10, 5);
  const nbReponse = verifParamsNumber(params.get("nbRp"), 1, 2, 2);
  const acquisTemp = verifParamsNumber(params.get("nbA"), 0, 100, 70);
  const ecaTemp = verifParamsNumber(params.get("nbPa"), 0, 100, 40);
  const {acquis, eca} = Utilitaires.getAcquisEca(acquisTemp, ecaTemp);
  return {
      refLecon: lecon,
      nbExercice: nbExercice,
      nbReponse: nbReponse,
      acquis: acquis,
      eca: eca,
  };
}