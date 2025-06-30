import { useEffect, useMemo, useState } from "react";
// import BorrowBookBox from "./BorrowBookBox";
// import BorrowBookBoxSkeleton from "./BorrowBookBoxSkeleton";
import axios from "axios";
import api from "@srcFront/api/axios";
import ReserveBookBox from "./ReserveBookBox";
import WaitBookBox from "./WaitBookBox";
import ReserveBookBoxSkeleton from "./ReserveBookBoxSkeleton";
import WaitBookBoxSkeleton from "./WaitBookBoxSkeleton";
import type {
  BookReadingType,
  BookType,
  BookWaitingType,
  StudentLibraryType,
} from "@shared/schema/library.schema";
import type { GroupMiniType } from "@shared/schema/group.schema";
import ReadBookBoxSkeleton from "./ReadBookBoxSkeleton";
import ReadBookBox from "./ReadBookBox";
import BorrowBookBoxSkeleton from "./BorrowBookBoxSkeleton";
import BorrowBookBox from "./BorrowBookBox";

interface StudentBookBoxProps {
  student: StudentLibraryType;
  updateStudentTypeEvent: (userId: number, newTypeEvent: string) => void;
  group: GroupMiniType;
}

function StudentBookBox({
  student,
  updateStudentTypeEvent,
  group,
}: StudentBookBoxProps) {
  const containsOne = useMemo(
    () => student.typeEvent?.split(",").map(Number).includes(1) ?? false,
    [student.typeEvent]
  );
  const containsFour = useMemo(
    () => student.typeEvent?.split(",").map(Number).includes(4) ?? false,
    [student.typeEvent]
  );

  const [bookReading, setBookReading] = useState<BookReadingType | null>(null);
  const [borrowableBooks, setBorrowableBooks] = useState<BookReadingType[]>([]);
  const [bookWaiting, setBookWaiting] = useState<BookWaitingType | null>(null);
  const [reservableBooks, setReservableBooks] = useState<
    Partial<BookWaitingType>[]
  >([]);
  const [isLoadingBorrowBox, setIsLoadingBorrowBox] = useState(true);
  const [isLoadingReserveBox, setIsLoadingReserveBox] = useState(true);
  const [error, setError] = useState("");

  // Charger les livres seulement si besoin
  useEffect(() => {
    const fetchBorrowableBooks = async () => {
      setIsLoadingBorrow(true);
      try {
        const booksToBorrow = await api.post<{ result: BookType[] }>(
          "/api/library/getBooksListToBorrowForUserId",
          {
            userId: student.userId,
            groupId: group.groupId,
            waiting: containsFour,
          }
        );
        const newList = await Promise.all(
          booksToBorrow.data.result.map((book) =>
            api
              .post<{ result: BookReadingType }>(
                "/api/library/bookToBorrowData",
                {
                  book: book,
                  userId: student.userId,
                }
              )
              .then((newBookResponse) => {
                // Met à jour les propriétés sans écraser les autres données de book
                const newBook: BookReadingType = newBookResponse.data.result;
                return newBook;
              })
          )
        );
        setBorrowableBooks(newList);
      } catch (error) {
        console.error("Erreur borrowableBooks", error);
      } finally {
        setIsLoadingBorrow(false);
      }
    };

    const fetchReservableBooks = async () => {
      setIsLoadingReserve(true);
      try {
        const booksResponse = await api.post<{ result: BookType[] }>(
          "/api/library/getBooksListToReserveByGroup",
          {
            groupId: group.groupId,
          }
        );
        const newList = await Promise.all(
          booksResponse.data.result.map((book) =>
            api
              .post<{ result: Partial<BookWaitingType> }>(
                "/api/library/bookToReserveData",
                {
                  book: book,
                  userId: student.userId,
                }
              )
              .then((newBookResponse) => {
                // Met à jour les propriétés sans écraser les autres données de book
                const newBook: Partial<BookWaitingType> =
                  newBookResponse.data.result;
                return newBook;
              })
          )
        );
        setReservableBooks(newList);
      } catch (error) {
        setError("Erreur ReservableBooks" + error);
        console.error("Erreur ReservableBooks", error);
      } finally {
        setIsLoadingReserve(false);
      }
    };

    const fetchBookReading = async () => {
      setIsLoadingRead(true);
      setError("");

      try {
        const response = await api.post("/api/library/bookReadingByuser", {
          userId: student.userId,
        });
        setBookReading(response.data.result);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          setError("Erreur axios:" + error.response.data);
        } else {
          setError("Erreur non axios");
        }
      } finally {
        setIsLoadingRead(false);
      }
    };

    const fetchBookWaiting = async () => {
      setIsLoadingWait(true);
      setError("");

      try {
        const response = await api.post<{ result: BookWaitingType }>(
          "/api/library/bookWaitingByuser",
          {
            userId: student.userId,
          }
        );
        setBookWaiting(response.data.result);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          setError("Erreur axios:" + error.response.data.message);
        } else {
          setError("Erreur non axios");
        }
      } finally {
        setIsLoadingWait(false);
      }
    };

    setBookReading(null);
    setBookWaiting(null);
    setBorrowableBooks([]);
    setReservableBooks([]);
    if (containsOne) {
      // Cas : l'élève est déjà en train de lire un livre
      fetchBookReading();
    } else {
      fetchBorrowableBooks();
    }
    if (containsFour) {
      // Cas : l'élève a déjà réservé un livre
      fetchBookWaiting();
    } else {
      fetchReservableBooks();
    }
  }, [containsFour, containsOne, group.groupId, student.userId]);

  // Fonction pour afficher la bonne box lecture
  const renderReadingBox = () => {
    if (containsOne) {
      if (isLoadingBorrowBox) {
        return <ReadBookBoxSkeleton />;
      }
      if (error !== "") {
        return <p>{error}</p>;
      }
      return (
        <ReadBookBox
          student={student}
          updateStudentTypeEvent={updateStudentTypeEvent}
          bookReading={bookReading}
        />
      );
    } else {
      if (isLoadingBorrowBox) {
        return <BorrowBookBoxSkeleton />;
      } else {
        return (
          <BorrowBookBox
            student={student}
            borrowableBooks={borrowableBooks}
            group={group}
            updateStudentTypeEvent={updateStudentTypeEvent}
          />
        );
      }
    }
  };

  // Fonction pour afficher la bonne box réservation
  const renderWaitingBox = () => {
    if (containsFour) {
      if (isLoadingReserveBox) {
        return <WaitBookBoxSkeleton />;
      }
      if (error !== "") {
        return <p>{error}</p>;
      }
      return (
        <WaitBookBox
          student={student}
          updateStudentTypeEvent={updateStudentTypeEvent}
          bookWaiting={bookWaiting}
        />
      );
    } else {
      if (isLoadingReserveBox) {
        return <ReserveBookBoxSkeleton />;
      } else {
        return (
          <ReserveBookBox
            student={student}
            reservableBooks={reservableBooks}
            updateStudentTypeEvent={updateStudentTypeEvent}
          />
        );
      }
    }
  };
  console.log("coucou");
  return (
    <div className="w-full">
      <p className="mt-0 mb-2 ml-2.5 text-xl">
        {student.userFirstName + " " + student.userFamilyName}
      </p>
      {renderReadingBox()}
      {renderWaitingBox()}
    </div>
  );
}

export default StudentBookBox;
