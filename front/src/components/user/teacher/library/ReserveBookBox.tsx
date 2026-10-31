import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import type {
  BookType,
  BookWaitingType,
  StudentLibraryType,
} from "@shared/schema/library.schema";
import api from "@srcFront/api/axios";

interface ReserveBookBoxProps {
  student: StudentLibraryType;
  reservableBooks: BookType[];
  updateStudentTypeEvent: (userId: number, newTypeEvent: string) => void;
}

function ReserveBookBox({
  student,
  reservableBooks,
  updateStudentTypeEvent,
}: ReserveBookBoxProps) {
  const { t } = useTranslation();
  const [reservableBookSelected, setReservableBookSelected] =
    useState<BookWaitingType>({
      bookGroupId: 0,
      bookId: 0,
      bookTitle: "",
      bookAuthor: "",
      bookPublisher: "",
      bookIsbn: "",
      bookLocation: "med",
      bookReservation: null,
      numberReaded: 0,
      waitingList: "",
      enableToBorrow: false,
      waitingListPlace: null,
      actualReader: "",
    });

  const reservableBookData = useCallback(
    async (book: BookType) => {
      // Récupérer les données du livre sélectionné
      try {
        const reponse = await api.post<{ result: BookWaitingType }>(
          "/api/library/bookToReserveData",
          {
            book: book,
            userId: student.userId,
          },
        );
        if (reponse.data) {
          return reponse.data.result;
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du livre :",
          error,
        );
      }
    },
    [student.userId],
  );

  // Charger les données du livre sélectionné
  useEffect(() => {
    const fetchReservableBookData = async () => {
      if (reservableBooks.length > 0) {
        const bookData = await reservableBookData(reservableBooks[0]);
        if (bookData) {
          setReservableBookSelected(bookData);
        }
      }
    };

    fetchReservableBookData();
  }, [reservableBookData, reservableBooks]);

  //les événements
  //changer le livre à emprunter
  const handleChangeReservableBookSelected = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedBookId = parseInt(event.target.value); // récupère l'ID du livre sélectionné
    const selectedBook = reservableBooks.find(
      (book) => book.bookGroupId === selectedBookId,
    );
    if (selectedBook) {
      const bookData = reservableBookData(selectedBook);
      bookData.then((data) => {
        if (data) {
          setReservableBookSelected(data);
        }
      });
    }
  };

  // réserver un livre
  const handleClickToReserve = async () => {
    if (reservableBookSelected.bookGroupId === null) {
      console.error("Aucun livre sélectionné pour l'emprunt.");
      return;
    }
    try {
      const myReservation = await api.post("/api/library/reserveABook", {
        userId: student.userId,
        bookGroupId: reservableBookSelected.bookGroupId,
      });

      if (myReservation.data && myReservation.data.result) {
        const containsOne: boolean =
          student.typeEvent?.split(",").map(Number).includes(1) ?? false; //vérifier si student en attente de lecture
        const newStudentEvents = containsOne ? "1,4" : "4";
        updateStudentTypeEvent(student.userId, newStudentEvents);
      }
    } catch (error) {
      console.error("Erreur lors de la réservation' :", error);
    }
  };

  //const de style
  const divCommentStyle = "mt-2 text-sm";
  const fieldsetStyle =
    "border-2 border-resolution-dark mb-2 ml-2 px-2 py-1 bg-white max-w-full overflow-x-auto rounded-md";
  const legendStyle =
    "border border-resolution rounded-2xl ml-3 p-2 text-[1.1em] bg-resolution/50";

  return (
    <fieldset className={fieldsetStyle}>
      <legend className={legendStyle}>
        {t("library.bookBox.bookNoWaiting")}
      </legend>
      <div className="mb-1">
        <select
          name="borrowedBookList"
          className="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChangeReservableBookSelected}
          value={
            reservableBookSelected.bookGroupId === null
              ? ""
              : reservableBookSelected.bookGroupId
          }
        >
          {reservableBooks.map((book) => {
            return (
              <option value={book.bookGroupId} key={book.bookGroupId}>
                {book.bookTitle}
                {book.bookAuthor !== null && `- ${book.bookAuthor}`} -{" "}
                {t(`library.bookBox.location.${book.bookLocation}`)}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <input
          className="mt-2 mr-2 px-1 py-0.5 text-sm cursor-pointer text-center rounded-full border-2 border-gray-400"
          type="button"
          value={t("library.reserveBookBox.reserveBook")}
          onClick={handleClickToReserve}
        />
      </div>
      <div className={divCommentStyle}>
        <p>
          {t("library.bookBox.numberRead")} :{" "}
          {reservableBookSelected?.numberReaded}
        </p>
        <p>
          {t("library.bookBox.numberWaiters")} :{" "}
          {reservableBookSelected?.waitingListPlace}
        </p>
        <p>
          {t("library.bookBox.reader")} : {reservableBookSelected?.actualReader}
        </p>
        <p>
          {t("library.bookBox.waiters")} : {reservableBookSelected?.waitingList}
        </p>
      </div>
    </fieldset>
  );
}

export default ReserveBookBox;
