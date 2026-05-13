import { useTranslation } from "react-i18next";

type ExerciseCardProps = {
  exercise: {
    exId: string;
    domaine: string;
    sousDomaine: string;
    logo: string;
    title: string;
    consigne: string;
    nbExercice: number;
    acquis: number;
    eca: number;
  };
  children: React.ReactNode;
};
function ExerciseCard({ exercise, children }: ExerciseCardProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`bg-white overflow-auto rounded-[30px] 
        pr-[50px] pl-[20px] pb-[20px] 
        border-t-[6px] border-b-[6px] border-l-[6px] border-r-[6px]
        border-t-${exercise.domaine} border-l-${exercise.domaine}
        border-b-${exercise.sousDomaine} border-r-${exercise.sousDomaine}
        [border-style:ridge]
      `}
    >
      <div className="flex flex-row pt-2">
        <img alt="logo nombre" src={`${exercise.logo}`} className="w-10" />
        <p
          className={`ml-2 grow-1 w-full h-10 flex items-center text-${exercise.sousDomaine}`}
        >
          {t(exercise.title)}
        </p>
      </div>

      {children}
    </div>
  );
}

export default ExerciseCard;
