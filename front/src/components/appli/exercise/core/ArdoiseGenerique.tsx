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

      <div className="mt-2 flex justify-center pt-4">
        <div className="w-[32px] mr-2 invisible"></div>
        <div className="mt-2 text-xl text-center w-full">{children}</div>
      </div>
    </>
  );
}

export default ArdoiseGenerique;
