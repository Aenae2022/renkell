import { findExerciseById } from "./exercises/exercisesRegistry";
import MaToolTip from "./MaToolTip";

type GeneralBoutonProps = {
  couleur: string;
  datas: string[];
};

export function MaJbdbExerciceBouton({ couleur, datas }: GeneralBoutonProps) {
  //const style

  return (
    <div>
      {datas.map((exId) => {
        const exercise = findExerciseById(exId);

        if (!exercise) {
          return null;
        }
        return <MaToolTip key={exId} couleur={couleur} data={exercise} />;
      })}
    </div>
  );
}

export default MaJbdbExerciceBouton;
