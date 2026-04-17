import MaToolTip from "./MaToolTip";

type GeneralBoutonProps = {
  couleur: string;
  datas: {
    exId: string;
    description: string;
    shortTitle: string;
    exampleQuestion: string;
    logo: string;
    duration: number;
    exerciseNumber: number;
    objectif: number;
    eca: number;
    calculAGenerer: () => void;
  }[];
};

export function MaJbdbExerciceBouton({ couleur, datas }: GeneralBoutonProps) {
  //const style

  return (
    <div>
      {datas.map((data) => {
        return <MaToolTip key={data.exId} couleur={couleur} data={data} />;
      })}
    </div>
  );
}

export default MaJbdbExerciceBouton;
