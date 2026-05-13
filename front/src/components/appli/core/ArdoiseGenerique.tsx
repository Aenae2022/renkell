import { useTranslation } from "react-i18next";
import LogoFr from "@pictures/icons/francais.png";
import LogoBr from "@pictures/icons/breton.png";
import { useEffect, useState, type ReactNode } from "react";
type ArdoiseGeneriqueProps = {
  itemId: number;
  consigne: string;
  langue: string;
  question: { model: string; toShow: ReactNode };
  itemStatus: string;
  isCorrect: boolean;
};

function ArdoiseGenerique({
  itemId,
  consigne,
  langue,
  question,
  itemStatus,
  isCorrect,
}: ArdoiseGeneriqueProps) {
  const { t } = useTranslation();
  const questionShow =
    itemStatus === "correction" && !isCorrect ? (
      question.toShow
    ) : (
      <span>{question.model}</span>
    );
  return (
    <>
      <div className="flex justify-items-start pl-24 mt-4">
        <img
          className="w-7 mr-4"
          alt="logo langue"
          src={langue === "fr" ? LogoFr : LogoBr}
        />
        {consigne !== "" ? (
          <h2 className="text-lg text-center">
            {t(consigne, { lng: langue })}
          </h2>
        ) : null}
      </div>

      <div>
        <p className="mt-2 text-xl text-center">{questionShow}</p>
      </div>
    </>
  );
}

export default ArdoiseGenerique;
