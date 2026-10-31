import type { ExerciseGenerique } from "@srcFront/features/exercises/core/exerciseGenerique.type";
import { useTranslation } from "react-i18next";
import { getAssetUrl } from "@utils/assetResolver";
type ExerciseCardProps = {
  exercise: ExerciseGenerique;
  title: string;
  children: React.ReactNode;
};
function ExerciseCard({ exercise, title, children }: ExerciseCardProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`bg-white overflow-auto rounded-[30px] 
        pr-[50px] pl-[20px] pb-[20px] 
        border-t-[6px] border-b-[6px] border-l-[6px] border-r-[6px]
        border-t-${exercise.meta.domaine} border-l-${exercise.meta.domaine}
        border-b-${exercise.meta.sousDomaine} border-r-${exercise.meta.sousDomaine}
        [border-style:ridge]
      `}
    >
      <div className="flex flex-row pt-2">
        <img
          alt="logo nombre"
          src={getAssetUrl(`pictures/${exercise.meta.logo}`)}
          className="w-10"
        />
        <p
          className={`ml-2 grow-1 w-full h-10 flex items-center text-${exercise.meta.sousDomaine}`}
        >
          {title}
        </p>
        <p className={`text-${exercise.meta.sousDomaine} text-sm`}>
          {exercise.params.config.refLecon !== ""
            ? t("main.lesson") + " " + exercise.params.config.refLecon
            : ""}
        </p>
      </div>

      {children}
    </div>
  );
}

export default ExerciseCard;
