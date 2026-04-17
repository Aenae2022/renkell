import jbdbLogo from "@pictures/exercice/chronometre.webp";
import { useTranslation } from "react-i18next";
export function MaJbdbHeader({
  myExercise,
}: {
  myExercise: {
    exId: string; //+
    description: string; //+
    shortTitle: string; //+
    logo: string; //+
    exampleQuestion: string; //+
    duration: number; //+
    exerciseNumber: number; //+
    objectif: number; //+
    eca: number; //+
    calculAGenerer: () => void; //+
  };
}) {
  const { t } = useTranslation();
  const description = t("jbdb.exercise.description." + myExercise.exId, {
    defaultValue: myExercise.description,
  });
  return (
    <div className="w-full border-b border-calculmental flex justify-between items-center font-bold text-[1.6em]">
      <img className="w-[50px] ml-5" src={jbdbLogo} />
      <p className="text-calculmental text-[1.4em]">
        {t("jbdb.exercise.title")}
        <br />
        <span className="text-[0.7em]"> {description}</span>
      </p>
      <img className="w-[60px] h-[60px] mr-5" src={myExercise.logo} />
    </div>
  );
}

export default MaJbdbHeader;
