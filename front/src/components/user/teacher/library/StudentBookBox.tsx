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
  const [borrowableBooks, setBorrowableBooks] = useState<BookType[]>([]);
  const [bookWaiting, setBookWaiting] = useState<BookWaitingType | null>(null);
  const [reservableBooks, setReservableBooks] = useState<BookType[]>([]);
  const [isLoadingBorrowBox, setIsLoadingBorrowBox] = useState(true);
  const [isLoadingReserveBox, setIsLoadingReserveBox] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBorrowableBooks = async () => {
      try {
        const booksToBorrow = await api.post<{ result: BookType[] }>(
          "/api/library/getBooksListToBorrowForUserId",
          {
            userId: student.userId,
            groupId: group.groupId,
            waiting: containsFour,
          }
        );
        return booksToBorrow.data.result;
      } catch (error) {
        console.error("Erreur borrowableBooks", error);
      }
    };

    const fetchReservableBooks = async () => {
      try {
        const booksResponse = await api.post<{ result: BookType[] }>(
          "/api/library/getBooksListToReserveByGroup",
          {
            groupId: group.groupId,
          }
        );

        return booksResponse.data.result;
      } catch (error) {
        setError("Erreur ReservableBooks" + error);
        console.error("Erreur ReservableBooks", error);
      }
    };

    const fetchBookReading = async () => {
      try {
        const response = await api.post("/api/library/bookReadingByuser", {
          userId: student.userId,
        });

        return response.data.result;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          setError("Erreur axios:" + error.response.data);
        } else {
          setError("Erreur non axios");
        }
      }
    };

    const fetchBookWaiting = async () => {
      try {
        const response = await api.post("/api/library/bookWaitingByuser", {
          userId: student.userId,
        });
        return response.data.result;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          setError("Erreur axios:" + error.response.data.message);
        } else {
          setError("Erreur non axios");
        }
      }
    };

    const fetchDataLibrary = async () => {
      setIsLoadingBorrowBox(true);
      setIsLoadingReserveBox(true);
      setError("");

      try {
        let bookReadingData = null;
        let bookWaitingData = null;
        let borrowableBooksData: BookType[] = [];
        let reservableBooksData: BookType[] = [];

        const tasks: Promise<unknown>[] = [];

        if (containsOne) {
          tasks.push(
            fetchBookReading().then((data) => (bookReadingData = data))
          );
        } else {
          tasks.push(
            fetchBorrowableBooks().then(
              (data) => (borrowableBooksData = data || [])
            )
          );
        }
        if (containsFour) {
          tasks.push(
            fetchBookWaiting().then((data) => (bookWaitingData = data))
          );
        } else {
          tasks.push(
            fetchReservableBooks().then(
              (data) => (reservableBooksData = data || [])
            )
          );
        }

        await Promise.all(tasks);

        setBookReading(bookReadingData);
        setBookWaiting(bookWaitingData);
        setBorrowableBooks(borrowableBooksData);
        setReservableBooks(reservableBooksData);
      } catch (err) {
        console.error("Erreur dans fetchDataLibrary", err);
        setError("Une erreur est survenue");
      } finally {
        setIsLoadingBorrowBox(false);
        setIsLoadingReserveBox(false);
      }
    };

    fetchDataLibrary();
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
