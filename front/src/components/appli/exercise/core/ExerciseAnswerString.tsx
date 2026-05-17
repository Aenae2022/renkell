import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LogoValid from "@pictures/icons/vrai.png";
import LogoUnvalid from "@pictures/icons/faux.png";
import type { ExerciseGeneriqueItem } from "@srcFront/features/exercises/core/exerciseGenerique.type";
import ColoredNumberClasse from "./ColoredNumberClasse";

type ExerciseAnswerStringProps = {
  item: ExerciseGeneriqueItem;
  handleVerify: (answer: string) => void;
  handleNextItem: (index: number) => void;
};
function ExerciseAnswerString({
  item,
  handleVerify,
  handleNextItem,
}: ExerciseAnswerStringProps) {
  const { t } = useTranslation();
  const [myAnswer, setMyAnswer] = useState<string>("");
  const renderers = {
    numberClasseColoree: ColoredNumberClasse,
  } as const;
  const ComponentCorrection =
    renderers[item.correction.type as keyof typeof renderers];

  const correctionToShow = (
    <ComponentCorrection nbrDec={item.correction.data} />
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (item.itemStatus === "correction") {
      buttonRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [item.itemStatus]);
  useEffect(() => {
    setMyAnswer(
      item.reponse.length === 0
        ? ""
        : `${item.reponse[item.reponse.length - 1]}`,
    );
  }, [item.reponse]);

  const buttonStyle =
    "w-48 pt-1 pb-2 cursor-pointer text-center rounded-full border-2 border-gray-400 bg-gray-200 hover:bg-gray-400";

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (item.itemStatus === "correction") {
            handleNextItem(item.id);
          } else {
            handleVerify(myAnswer);
          }
        }}
      >
        <div className="mt-8 flex justify-center ">
          <div
            className={`w-[32px] mr-2 ${item.itemStatus === "question" ? "invisible" : ""}`}
          >
            <img
              src={item.isCorrect ? LogoValid : LogoUnvalid}
              alt="validation"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <input
            ref={inputRef}
            className="text-center text-2xl w-[95%] text-sky-700  border-black border-2 rounded-md mr-3 "
            type="text"
            value={myAnswer}
            onChange={(e) => setMyAnswer(e.target.value)}
            disabled={item.itemStatus === "correction"}
          />
        </div>
        {item.conseil !== "" ? (
          <p>{t(item.conseil, { lng: item.typeLangue })}</p>
        ) : null}
        {item.itemStatus === "correction" && !item.isCorrect ? (
          <div className="mt-2 flex justify-center ">
            <div className="w-[32px] mr-2 invisible"></div>
            <p className="text-center text-2xl  border-gray-200 border-1 rounded-md mr-3 ">
              {correctionToShow}
            </p>
          </div>
        ) : null}
        <div className="mt-8 flex justify-center">
          <div className="w-[32px] mr-2 invisible"></div>
          <button type="submit" className={buttonStyle} ref={buttonRef}>
            {item.itemStatus === "question"
              ? t("main.verify", { lng: item.typeLangue })
              : item.itemStatus === "essai2"
                ? t("main.verify2", { lng: item.typeLangue })
                : t("main.next", { lng: item.typeLangue })}
          </button>
        </div>
      </form>
    </>
  );
}

export default ExerciseAnswerString;
