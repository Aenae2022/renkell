import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AxiosError } from "axios";
import api from "@srcFront/api/axios";
import type {
  BookReadingType,
  StudentLibraryType,
} from "@shared/schema/library.schema";

interface ReadBookBoxProps {
  student: StudentLibraryType;
  updateStudentTypeEvent: (userId: number, newTypeEvent: string) => void;
  bookReading: BookReadingType | null;
}

function ReadBookBox({
  student,
  updateStudentTypeEvent,
  bookReading,
}: ReadBookBoxProps) {
  const { t } = useTranslation();
  const [bookReturnReaded, setBookReturnReaded] = useState<boolean>(true);

  //les boutons qui mettront à jour StudentsList localement et chargeront la modif en BD =>normalement 1 seul re render
  const handleClickRemoveBook = async () => {
    try {
      const result = await api.post("/api/library/removeBorrowABook", {
        userId: student.userId,
        bookGroupId: bookReading?.bookGroupId,
      });
      if (result.data.reponse) {
        const containsFour: boolean =
          student.typeEvent?.split(",").map(Number).includes(4) ?? false; //vérifier si student en attente de lecture
        const newStudentEvents = containsFour ? "4" : "";
        updateStudentTypeEvent(student.userId, newStudentEvents);
      }
      return;
    } catch (error: unknown) {
      // Utilisation de `unknown` pour éviter `any`
      if (error instanceof AxiosError && error.response) {
        console.log("erreur Axios" + error.response.data.message); // Message d'erreur du backend
      } else {
        console.log("Erreur serveur !");
      }
    }
  };

  const handleClickReturnBook = async () => {
    try {
      const result = await api.post("/api/library/returnABook", {
        userId: student.userId,
        bookGroupId: bookReading?.bookGroupId,
        isReaded: bookReturnReaded,
      });
      if (result.data.reponse) {
        const containsFour: boolean =
          student.typeEvent?.split(",").map(Number).includes(4) ?? false; //vérifier si student en attente de lecture
        const newStudentEvents = containsFour ? "4" : "";
        updateStudentTypeEvent(student.userId, newStudentEvents);
      }
      return;
    } catch (error: unknown) {
      // Utilisation de `unknown` pour éviter `any`
      if (error instanceof AxiosError && error.response) {
        console.log("erreur Axios" + error.response.data.message); // Message d'erreur du backend
      } else {
        console.log("Erreur serveur return Book!");
      }
    }
  };

  //const de style
  const divCommentStyle = "mt-2 text-sm";
  const fieldsetStyle =
    "border-2 border-grammaire-dark mb-2 ml-2 px-2 py-1 bg-white max-w-full overflow-x-auto rounded-md";
  const legendStyle =
    "border border-grammaire rounded-2xl ml-3 p-2 text-[1.1em] bg-grammaire-50";
  //composant à afficher
  let boxToShow = null;

  if (bookReading !== null && bookReading !== undefined) {
    boxToShow = (
      <fieldset className={fieldsetStyle}>
        <legend className={legendStyle}>
          {t("library.bookBox.bookReading")}
        </legend>
        <p className="text-grammaire text-[1.2em]">
          {bookReading.bookTitle}{" "}
          {bookReading.bookAuthor !== null ? `- ${bookReading.bookAuthor}` : ""}{" "}
          - {t(`library.bookBox.location.${bookReading.bookLocation}`)}
        </p>
        <div className="flex">
          <div className="mr-4">
            <input
              type="radio"
              name="returnBook"
              value="readed"
              checked={bookReturnReaded}
              onChange={() => setBookReturnReaded(!bookReturnReaded)}
            />
            <label className="ml-1 mr-4">
              {t("library.readingBookBox.returnRead")}
            </label>
            <input
              type="radio"
              name="returnBook"
              value="notReaded"
              checked={!bookReturnReaded}
              onChange={() => setBookReturnReaded(!bookReturnReaded)}
            />
            <label className="ml-1">
              {t("library.readingBookBox.returnNotRead")}
            </label>
          </div>
        </div>
        <div>
          <input
            className="mt-2 mr-2 px-1 py-0.5 cursor-pointer text-center text-sm rounded-full border-2 border-gray-400"
            type="button"
            value={t("library.readingBookBox.returnBook")}
            onClick={handleClickReturnBook}
          />
          <input
            className="mt-2 mr-2 px-1 py-0.5 cursor-pointer text-center text-sm rounded-full border-2 border-gray-400"
            type="button"
            value={t("library.readingBookBox.deleteBook")}
            onClick={handleClickRemoveBook}
          />
        </div>
        {bookReading.bookReservation && (
          <p className="text-calcul font-bold">
            {t("library.readingBookBox.reserved")}
          </p>
        )}
        <div className={divCommentStyle}>
          <p>
            {t("library.bookBox.numberRead")} : {bookReading.numberReaded}
          </p>
          {bookReading.bookReservation && (
            <p>
              {t("library.bookBox.waiters")} : {bookReading.waitingList}
            </p>
          )}
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

export default ReadBookBox;
