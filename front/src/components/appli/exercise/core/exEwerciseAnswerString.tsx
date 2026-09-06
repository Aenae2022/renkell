import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import LogoValid from "@pictures/icons/vrai.png";
import LogoUnvalid from "@pictures/icons/faux.png";

type ExerciseAnswerStringProps = {
  reponse: string[];
  itemStatus: "question" | "essai2" | "correction";
  isCorrect: boolean;
  correctionToShow: ReactNode;
  itemId: number;
  typeLangue: string;
  conseil: string;
  handleVerify: (answer: string) => void;
  handleNextItem: (index: number) => void;
};
function ExerciseAnswerString({
  reponse,
  itemStatus,
  isCorrect,
  correctionToShow,
  itemId,
  typeLangue,
  conseil,
  handleVerify,
  handleNextItem,
}: ExerciseAnswerStringProps) {
  const { t } = useTranslation();
  const [myAnswer, setMyAnswer] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (itemStatus === "correction") {
      buttonRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [itemStatus]);
  useEffect(() => {
    setMyAnswer(reponse.length === 0 ? "" : `${reponse[reponse.length - 1]}`);
  }, [reponse]);

  const buttonStyle =
    "w-48 pt-1 pb-2 cursor-pointer text-center rounded-full border-2 border-gray-400 bg-gray-200 hover:bg-gray-400";

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (itemStatus === "correction") {
            handleNextItem(itemId);
          } else {
            handleVerify(myAnswer);
          }
        }}
      >
        <div className="mt-8 flex justify-center ">
          <div
            className={`w-[32px] mr-2 ${itemStatus === "question" ? "invisible" : ""}`}
          >
            <img
              src={isCorrect ? LogoValid : LogoUnvalid}
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
            disabled={itemStatus === "correction"}
          />
        </div>
        {conseil !== "" ? <p>{t(conseil, { lng: typeLangue })}</p> : null}
        <div className="mt-8 flex justify-center">
          <button type="submit" className={buttonStyle} ref={buttonRef}>
            {itemStatus === "question"
              ? t("main.verify", { lng: typeLangue })
              : itemStatus === "essai2"
                ? t("main.verify2", { lng: typeLangue })
                : t("main.next", { lng: typeLangue })}
          </button>
        </div>
      </form>
      {itemStatus === "correction" && !isCorrect ? (
        <div className="mt-2 flex justify-center ">
          <div className="w-[32px] mr-2 invisible"></div>
          <p className="text-center text-2xl  border-gray-200 border-1 rounded-md mr-3 ">
            {correctionToShow}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default ExerciseAnswerString;
