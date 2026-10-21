import { useAuthStrict } from "@hook/useAuthStrict";
import { findExerciseById } from "./exercises/exercisesRegistry";
import MaToolTip from "./MaToolTip";
import { MaJbdbAssociateButtons } from "./MaJbdbdAssociateButtons";

type GeneralBoutonProps = {
  couleur: string;
  datas: string[];
};

export function MaJbdbExerciceBouton({ couleur, datas }: GeneralBoutonProps) {
  const auth = useAuthStrict();
  const user = auth.status === "authenticated" ? auth.user : undefined;

  return (
    <div className="flex">
      {datas.map((exId) => {
        const exercise = findExerciseById(exId);

        if (!exercise) {
          return null;
        }
        return <div className="mr-2" key={exId}>
          <MaToolTip  couleur={couleur} data={exercise} />
          {user !== undefined ? <MaJbdbAssociateButtons exId={exercise.exId} exTranslationKey={exercise.translationId} user={user}/> : null}
        </div>;
      })}
    </div>
  );
}

export default MaJbdbExerciceBouton;
