import { useTranslation } from "react-i18next";
import LogoFr from "@pictures/icons/francais.png";
import LogoBr from "@pictures/icons/breton.png";
import type { ExerciseGeneriqueItem } from "@srcFront/features/exercises/core/exerciseGenerique.type";
type ArdoiseGeneriqueProps = {
  consigne: string;
  item: ExerciseGeneriqueItem<unknown>;
  children: React.ReactNode;
};

function ArdoiseGenerique({ consigne, item, children }: ArdoiseGeneriqueProps) {
  const { t } = useTranslation();
  // const renderers = {
  //   numberClasseColoree: ColoredNumberClasse,
  // } as const;
  // const ComponentCorrection =
  //   renderers[item.question.type as keyof typeof renderers];

  // const questionShow =
  //   item.itemStatus === "correction" && !item.isCorrect ? (
  //     <ComponentCorrection nbrDec={item.question.data} />
  //   ) : (
  //     <span>{item.question.model}</span>
  //   );
  return (
    <>
      <div className="flex justify-items-start pl-24 mt-4">
        <img
          className="w-7 mr-4"
          alt="logo langue"
          src={item.typeLangue === "fr" ? LogoFr : LogoBr}
        />
        {consigne !== "" ? (
          <h2 className="text-lg text-center">
            {t(consigne, { lng: item.typeLangue })}
          </h2>
        ) : null}
      </div>

      <div className="mt-2 flex justify-center">
        <div className="w-[32px] mr-2 invisible"></div>
        <p className="mt-2 text-xl text-center">{children}</p>
      </div>
    </>
  );
}

export default ArdoiseGenerique;
