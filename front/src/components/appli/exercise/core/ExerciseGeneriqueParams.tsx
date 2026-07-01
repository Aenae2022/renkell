import type {
  ExerciseGeneriqueParamsAction,
  ExerciseGeneriqueParamsState,
} from "@srcFront/features/exercises/core/exerciseGenerique.type";
import { Utilitaires } from "@utils/Utilitaires";
import { refLeconSchema } from "@shared/schema/fields/refLecon.schema";
import { useTranslation } from "react-i18next";
type Props = {
  paramsGenerique: ExerciseGeneriqueParamsState;
  dispatchGenerique: React.Dispatch<ExerciseGeneriqueParamsAction>;
  domaine: string;
};

function ExerciseGeneriqueParams({
  paramsGenerique,
  dispatchGenerique,
  domaine,
}: Props) {
  const { t } = useTranslation();
  const fieldsetStyle = `border-2 border-${domaine}-dark mb-2 ml-2 px-2 py-1 bg-white max-w-full overflow-x-auto rounded-md`;
  const legendStyle = `border border-${domaine} rounded-2xl ml-3 p-2 text-[1.1em] bg-${domaine}/50`;
  const inputStyle = "border-2 border-gray-300 rounded-md px-1 py-0.5 ml-2 ";
  const inputStyleUnvalid =
    "border-2 border-red-500  rounded-md px-1 py-0.5 ml-2  bg-red-100";
  const divStyle = "mt-2";

  const handleChangeRefLecon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchGenerique({ type: "SET_REFLECONSAISIE", value });

    const cleanSaisie = Utilitaires.validInputString(value);
    const parsedSaisie = refLeconSchema.safeParse(cleanSaisie);
    dispatchGenerique({
      type: "SET_REFLECONVALID",
      value: parsedSaisie.success,
    });
  };

  const handleChangeNbExercice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchGenerique({ type: "SET_NBEXERCICESAISIE", value });

    const cleanSaisie = Utilitaires.validInputString(value);
    const isValid = Utilitaires.isIntegerInRange(cleanSaisie, 1, 10);
    dispatchGenerique({ type: "SET_NBEXERCICEVALID", value: isValid });
  };

  const handleChangeNbReponse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchGenerique({ type: "SET_NBREPONSESAISIE", value });
    const cleanSaisie = Utilitaires.validInputString(value);
    const isValid = Utilitaires.isIntegerInRange(cleanSaisie, 1, 2);
    dispatchGenerique({ type: "SET_NBREPONSEVALID", value: isValid });
  };

  const handleChangeAcquis = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchGenerique({ type: "SET_ACQUISSAISIE", value });
    const cleanSaisie = Utilitaires.validInputString(value);
    const isValid =
      Utilitaires.isIntegerInRange(cleanSaisie, 1, 100) &&
      parseInt(cleanSaisie) > parseInt(paramsGenerique.eca.saisie);
    dispatchGenerique({ type: "SET_ACQUISVALID", value: isValid });
  };

  const handleChangeEca = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchGenerique({ type: "SET_ECASAISIE", value });

    const cleanSaisie = Utilitaires.validInputString(value);
    const isValid =
      Utilitaires.isIntegerInRange(cleanSaisie, 1, 100) &&
      parseInt(cleanSaisie) < parseInt(paramsGenerique.acquis.saisie);
    dispatchGenerique({ type: "SET_ECAVALID", value: isValid });
  };

  return (
    <div>
      <form>
        <fieldset className={fieldsetStyle}>
          <legend className={legendStyle}>
            {t("applies.generique.exerciseGenericSettings")}
          </legend>
          <div className={divStyle}>
            <label htmlFor="refLecon">{t("applies.generique.refLecon")}</label>
            <input
              className={`w-[100px] ${
                paramsGenerique.refLecon.isValid
                  ? inputStyle
                  : inputStyleUnvalid
              }`}
              type="text"
              id="refLecon"
              name="refLecon"
              value={paramsGenerique.refLecon.saisie}
              onChange={handleChangeRefLecon}
            />
          </div>
          <div className={divStyle}>
            <label htmlFor="nbExercice">
              {t("applies.generique.nbExercice")}
            </label>
            <input
              className={`w-[50px] ${
                paramsGenerique.nbExercice.isValid
                  ? inputStyle
                  : inputStyleUnvalid
              }`}
              type="number"
              id="nbExercice"
              name="nbExercice"
              min="1"
              max="10"
              value={paramsGenerique.nbExercice.saisie}
              onChange={handleChangeNbExercice}
            />
            <label htmlFor="nbReponse" className="ml-6">
              {t("applies.generique.nbReponse")}
            </label>
            <input
              className={`w-[50px] ${
                paramsGenerique.nbReponse.isValid
                  ? inputStyle
                  : inputStyleUnvalid
              }`}
              type="number"
              id="nbReponse"
              name="nbReponse"
              min="1"
              max="2"
              value={paramsGenerique.nbReponse.saisie}
              onChange={handleChangeNbReponse}
            />
          </div>
          <div className={divStyle}>
            <p>{t("applies.generique.reussiteText")}</p>
            <div>
              <label htmlFor="acquis">- {t("applies.generique.acquis")}</label>
              <input
                className={`w-[50px] ${
                  paramsGenerique.acquis.isValid
                    ? inputStyle
                    : inputStyleUnvalid
                }`}
                type="number"
                id="acquis"
                name="acquis"
                min="1"
                max="100"
                value={paramsGenerique.acquis.saisie}
                onChange={handleChangeAcquis}
              />
            </div>
            <div>
              <label htmlFor="eca">- {t("applies.generique.eca")}</label>
              <input
                className={`w-[50px] ${
                  paramsGenerique.eca.isValid ? inputStyle : inputStyleUnvalid
                }`}
                type="number"
                id="eca"
                name="eca"
                min="1"
                max="100"
                value={paramsGenerique.eca.saisie}
                onChange={handleChangeEca}
              />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default ExerciseGeneriqueParams;
