import { useTranslation } from "react-i18next";
import api from "@srcFront/api/axios";
import type {
  BookWaitingType,
  StudentLibraryType,
} from "@shared/schema/library.schema";

interface WaitBookBoxProps {
  student: StudentLibraryType;
  updateStudentTypeEvent: (userId: number, newTypeEvent: string) => void;
  bookWaiting: BookWaitingType | null;
}

function WaitBookBox({
  student,
  updateStudentTypeEvent,
  bookWaiting,
}: WaitBookBoxProps) {
  const { t } = useTranslation();

  //le bouton qui mettra à jour StudentsList localement et chargera la modif en BD =>normalement 1 seul re render
  const handleClickRemoveBook = async () => {
    try {
      const result = await api.post("/api/library/removeReserveABook", {
        userId: student.userId,
        bookGroupId: bookWaiting?.bookGroupId,
      });
      if (result.data.reponse) {
        const containsOne: boolean =
          student.typeEvent?.split(",").map(Number).includes(1) ?? false; //vérifier si student est lecteur
        const newStudentEvents = containsOne ? "1" : "";
        updateStudentTypeEvent(student.userId, newStudentEvents);
      }
      return;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du livre :",
        error
      );
    }
  };
  //const de style
  const divCommentStyle = "mt-2 text-sm";
  const fieldsetStyle =
    "border-2 border-resolution-dark mb-2 ml-2 px-2 py-1 bg-white max-w-full overflow-x-auto rounded-md";
  const legendStyle =
    "border border-resolution rounded-2xl ml-3 p-2 text-[1.1em] bg-resolution-50";
  //composant à afficher
  let boxToShow = null;

  if (bookWaiting !== null && bookWaiting !== undefined) {
    boxToShow = (
      <fieldset className={fieldsetStyle}>
        <legend className={legendStyle}>
          {t("library.bookBox.bookWaiting")}
        </legend>
        <p className="text-resolution text-[1.2em]">
          {bookWaiting.bookTitle}{" "}
          {bookWaiting.bookAuthor !== null ? `- ${bookWaiting.bookAuthor}` : ""}{" "}
          - {t(`library.bookBox.location.${bookWaiting.bookLocation}`)}
        </p>

        <div>
          <input
            className="mt-2 mr-2 px-1 py-0.5 cursor-pointer text-center text-sm rounded-full border-2 border-gray-400"
            type="button"
            value={t("library.reserveBookBox.deleteBook")}
            onClick={handleClickRemoveBook}
          />
        </div>
        <div className={divCommentStyle}>
          <p>
            {t("library.bookBox.disponibility")} :{" "}
            {bookWaiting.enableToBorrow
              ? t("library.bookBox.yes")
              : t("library.bookBox.no")}
          </p>
          <p>
            {t("library.bookBox.numberRead")} : {bookWaiting.numberReaded}
          </p>
          <p>
            {t("library.bookBox.renk")} : {bookWaiting.waitingListPlace}
          </p>
          <p>
            {t("library.bookBox.reader")} : {bookWaiting.actualReader}
          </p>
          <p>
            {t("library.bookBox.waiters")} : {bookWaiting.waitingList}
          </p>
        </div>
      </fieldset>
    );
  }

  return (
    <>
      <div>{boxToShow}</div>
    </>
  );
}

export default WaitBookBox;
