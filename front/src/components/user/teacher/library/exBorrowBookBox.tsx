import { useTranslation } from "react-i18next";
import { useState } from "react";
// import FicheBook from "./FicheBook";
import type {
  BookReadingType,
  StudentLibraryType,
} from "@shared/schema/library.schema";
import type { GroupMiniType } from "@shared/schema/group.schema";

interface BorrowBookBoxProps {
  student: StudentLibraryType;
  borrowableBooks: BookReadingType[];
  group: GroupMiniType;
  updateStudentTypeEvent: (userId: number, newTypeEvent: string) => void;
}

function BorrowBookBox({
  student,
  borrowableBooks,
  group,
  updateStudentTypeEvent,
}: BorrowBookBoxProps) {
  const { t } = useTranslation();
  const [borrowableBookSelected, setBorrowableBookSelected] =
    useState<BookReadingType>(borrowableBooks[0]);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  //les actions sur les boutons
  //changer le livre à emprunter
  const handleChangeBorrowableBookSelected = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedBookId = parseInt(event.target.value); // récupère l'ID du livre sélectionné
    const selectedBook = borrowableBooks.find(
      (book) => book.bookGroupId === selectedBookId
    );
    if (selectedBook) {
      setBorrowableBookSelected(selectedBook); // Met à jour l'état avec le livre sélectionné
    }
  };

  //emprunter un livre collectif
  // const handleClickGroupBorrow = async () => {
  //   if (borrowableBookSelected.bookGroupId === null) {
  //     console.error("Aucun livre sélectionné pour l'emprunt.");
  //     return;
  //   }
  //   try {
  //     const myReservation = await axiosInstance.post(
  //       "http://localhost:5000/api/library/borrowABook",
  //       {
  //         userId: student.userId,
  //         bookGroupId: borrowableBookSelected.bookGroupId,
  //       }
  //     );

  //     if (myReservation.data.reponse) {
  //       const containsFour: boolean =
  //         student.type_event?.split(",").map(Number).includes(4) ?? false; //vérifier si student en attente de lecture
  //       const newStudentEvents = containsFour ? "1,4" : "1";
  //       updateStudentTypeEvent(student.userId, newStudentEvents);
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de l'emprunt' :", error);
  //   }
  // };

  //emprunter un livre individuel
  // const handleClickShowPersonalBorrow = async () => {
  //   setShowPopup(true);
  // };

  //const de style
  const divCommentStyle = "mt-2 text-sm";
  const fieldsetStyle =
    "border-2 border-grammaire-dark mb-2 ml-2 px-2 py-1 bg-white max-w-full overflow-x-auto rounded-md";
  const legendStyle =
    "border border-grammaire rounded-2xl ml-3 p-2 text-[1.1em] bg-grammaire-50";

  if (borrowableBookSelected) {
    return (
      <>
        <fieldset className={fieldsetStyle}>
          <legend className={legendStyle}>
            {t("library.bookBox.bookNoReading")}
          </legend>
          <div className="mb-1">
            <select
              name="borrowedBookList"
              className="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChangeBorrowableBookSelected}
              value={borrowableBookSelected.bookGroupId}
            >
              {borrowableBooks.map((book) => {
                return (
                  <option value={book.bookGroupId} key={book.bookGroupId}>
                    {book.bookTitle}
                    {book.bookAuthor != null && `- ${book.bookAuthor}`} -{" "}
                    {t(`library.bookBox.location.${book.bookLocation}`)}
                  </option>
                );
              })}
            </select>
            {/* <p id="bookSelectedBorrowedNumberRead"><?= $studentBookBoxFormLanguage['numberRead']?><em><?= $student['nbReadedToBorrow'] ?></em></p> */}
          </div>
          {borrowableBooks.length === 1 && (
            <p className="text-calcul font-bold">
              {t("library.readingBookBox.reserved")}
            </p>
          )}

          <div>
            <input
              className="mt-2 mr-2 px-1 py-0.5 cursor-pointer text-center text-sm rounded-full border-2 border-gray-400"
              type="button"
              value={t("library.readingBookBox.borrowBook")}
              //onClick={handleClickGroupBorrow}
            />
            <input
              className="mt-1 mr-2 px-1 py-0.5 cursor-pointer text-center text-xs rounded-full border-2 border-gray-400"
              type="button"
              value={t("library.readingBookBox.borrowBookPersonal")}
              //onClick={handleClickShowPersonalBorrow}
            />
          </div>
          <div className={divCommentStyle}>
            <p>
              {t("library.bookBox.numberRead")} :{" "}
              {borrowableBookSelected.numberReaded}
            </p>
            <p>
              {t("library.bookBox.waiters")} :{" "}
              {borrowableBookSelected?.waitingList}
            </p>
          </div>
        </fieldset>
        {showPopup && (
          <FicheBook
            isPersonal={true}
            student={student}
            groupId={group.groupId}
            showPopup={setShowPopup}
            updateStudentTypeEvent={updateStudentTypeEvent}
          />
        )}
      </>
    );
  }
}

export default BorrowBookBox;
