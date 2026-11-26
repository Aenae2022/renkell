import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import LogoValid from "@pictures/icons/vrai.png";
import LogoUnvalid from "@pictures/icons/faux.png";

type ExerciseAnswer1Props = {
  reponse: string[] | number[];
  itemStatus: string;
  isCorrect: boolean;
  correctionToShow: ReactNode;
  itemId: number;
  typeLangue: string;
  handleVerify: (answer: string) => void;
  handleNextItem: (index: number) => void;
};
function ExerciseAnswer1({
  reponse,
  itemStatus,
  isCorrect,
  correctionToShow,
  itemId,
  typeLangue,
  handleVerify,
  handleNextItem,
}: ExerciseAnswer1Props) {
  const { t } = useTranslation();
  const [myAnswer, setMyAnswer] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setMyAnswer(reponse.length === 0 ? "" : `${reponse[reponse.length - 1]}`);
  }, [reponse]);

  const buttonStyle =
    "w-48 pt-1 pb-2 cursor-pointer text-center rounded-full border-2 border-gray-400 bg-gray-200 hover:bg-gray-400";

  let containerColor = "white";
  if (itemStatus === "essai2") {
    containerColor = "calcul-light/50";
  } else if (itemStatus === "correction") {
    containerColor = isCorrect ? "orthographe-light/50" : "calcul-light/50";
  }
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
        <div className={`mt-8 flex justify-center bg-${containerColor}`}>
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
            className="text-center text-3xl text-sky-700 w-52 border-black border-2 rounded-md mr-3 "
            type="number"
            value={myAnswer}
            onChange={(e) => setMyAnswer(e.target.value)}
            disabled={itemStatus === "correction"}
          />
          <button type="submit" className={buttonStyle}>
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
          <p className="text-center text-3xl w-32 border-gray-200 border-1 rounded-md mr-3 ">
            {correctionToShow}
          </p>
          <button
            type="submit"
            className="w-48 pt-1 pb-2 cursor-pointer text-center rounded-full invisible"
          ></button>
        </div>
      ) : null}
    </>
  );
}

export default ExerciseAnswer1;
