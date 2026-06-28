import type {
  ExerciseGeneriqueParamsAction,
  ExerciseGeneriqueParamsState,
} from "@srcFront/features/exercises/core/exerciseGenerique.type";
import { Utilitaires } from "@utils/Utilitaires";
import { refLeconSchema } from "@shared/schema/fields/refLecon.schema";
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
    if (isValid) {
      dispatchGenerique({ type: "SET_NBEXERCICE", value: cleanSaisie });
    } else {
      dispatchGenerique({
        type: "SET_NBEXERCICE",
        value: paramsGenerique.nbExercice.default,
      });
    }
    dispatchGenerique({ type: "SET_NBEXERCICEVALID", value: isValid });
  };

  const handleChangeNbReponse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchGenerique({ type: "SET_NBREPONSESAISIE", value });

    const cleanSaisie = Utilitaires.validInputString(value);
    const isValid = Utilitaires.isIntegerInRange(cleanSaisie, 1, 2);
    if (isValid) {
      dispatchGenerique({ type: "SET_NBREPONSE", value: cleanSaisie });
    } else {
      dispatchGenerique({
        type: "SET_NBREPONSE",
        value: paramsGenerique.nbReponse.default,
      });
    }
    dispatchGenerique({ type: "SET_NBREPONSEVALID", value: isValid });
  };

  const handleChangeAcquis = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchGenerique({ type: "SET_ACQUISSAISIE", value });

    const cleanSaisie = Utilitaires.validInputString(value);
    const isValid = Utilitaires.isIntegerInRange(cleanSaisie, 1, 100);
    if (isValid) {
      dispatchGenerique({ type: "SET_ACQUIS", value: cleanSaisie });
    } else {
      dispatchGenerique({
        type: "SET_ACQUIS",
        value: paramsGenerique.acquis.default,
      });
    }
    dispatchGenerique({ type: "SET_ACQUISVALID", value: isValid });
  };

  const handleChangeEca = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchGenerique({ type: "SET_ECASAISIE", value });

    const cleanSaisie = Utilitaires.validInputString(value);
    const isValid =
      Utilitaires.isIntegerInRange(cleanSaisie, 1, 100) &&
      cleanSaisie < paramsGenerique.acquis.valeur;
    if (isValid) {
      dispatchGenerique({ type: "SET_ECA", value: cleanSaisie });
    } else {
      dispatchGenerique({
        type: "SET_ECA",
        value: paramsGenerique.eca.default,
      });
    }
    dispatchGenerique({ type: "SET_ECAVALID", value: isValid });
  };

  return (
    <div>
      <form>
        <fieldset className={fieldsetStyle}>
          <legend className={legendStyle}>
            Réglages généraux de l'exercice
          </legend>
          <div className={divStyle}>
            <label htmlFor="refLecon">Référence de la leçon</label>
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
            <label htmlFor="nbExercice">Nombre d'exercices</label>
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
              Nombre d'essais
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
            <p>
              Pourcentage de réussite à atteindre pour considérer l'exercice
              comme
            </p>
            <div>
              <label htmlFor="acquis">- acquis</label>
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
              <label htmlFor="eca">- en cours d'acquisition</label>
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
