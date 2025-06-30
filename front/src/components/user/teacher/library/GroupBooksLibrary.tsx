import FlecheBas from "@pictures/icons/flecheBas.png";
import FlecheHaut from "@pictures/icons/flecheHaut.png";
import DeleteLogo from "@pictures/icons/faux.png";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-toastify";
import AddLogo from "@pictures/additionner.png";
import FicheBook from "./FicheBook";
import type {
  BookToGroupListType,
  BookType,
} from "@shared/schema/library.schema";
import type { GroupMiniType } from "@shared/schema/group.schema";
import api from "@srcFront/api/axios";

interface GroupBooksLibraryProps {
  groupBooksList: BookType[];
  group: GroupMiniType;
}

export default function GroupBooksLibrary({
  groupBooksList,
  group,
}: GroupBooksLibraryProps) {
  const { t } = useTranslation();
  const [actionsOrder, setActionsOrder] = useState([
    "title",
    "author",
    "location",
  ]);
  const [myGroupBooksList, setMyGroupBooksList] =
    useState<BookType[]>(groupBooksList);
  const [filterTitle, setFilterTitle] = useState<string>("desc");
  const [filterAuthor, setFilterAuthor] = useState<string>("desc");
  const [filterLocation, setFilterLocation] = useState<string>("desc");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleSortedBooks = (
    books: BookType[],
    orderTitle: string,
    orderAuthor: string,
    orderLocation: string,
    order: string[]
  ) => {
    return [...books].sort((a: BookType, b: BookType) => {
      for (const criterion of order) {
        if (criterion === "location") {
          if (a.bookLocation < b.bookLocation)
            return orderLocation === "desc" ? -1 : 1;
          if (a.bookLocation > b.bookLocation)
            return orderLocation === "desc" ? 1 : -1;
        } else if (criterion === "title") {
          if (a.bookTitle.toLowerCase() < b.bookTitle.toLowerCase())
            return orderTitle === "desc" ? -1 : 1;
          if (a.bookTitle.toLowerCase() > b.bookTitle.toLowerCase())
            return orderTitle === "desc" ? 1 : -1;
        } else if (criterion === "author") {
          if (
            (a.bookAuthor ? a.bookAuthor.toLowerCase() : "") <
            (b.bookAuthor ? b.bookAuthor.toLowerCase() : "")
          )
            return orderAuthor === "desc" ? -1 : 1;
          if (
            (a.bookAuthor ? a.bookAuthor.toLowerCase() : "") >
            (b.bookAuthor ? b.bookAuthor.toLowerCase() : "")
          )
            return orderAuthor === "desc" ? 1 : -1;
        }
      }
      return 0;
    });
  };

  //les événéments
  const handleClickOrderFilter = (action: string) => {
    let orderTitle = filterTitle;
    let orderAuthor = filterAuthor;
    let orderLocation = filterLocation;
    //on actualise le filtre cliqué
    switch (action) {
      case "title":
        orderTitle = filterTitle === "desc" ? "asc" : "desc";
        setFilterTitle(filterTitle === "desc" ? "asc" : "desc");
        break;
      case "author":
        orderAuthor = filterAuthor === "desc" ? "asc" : "desc";
        setFilterAuthor(filterAuthor === "desc" ? "asc" : "desc");
        break;
      case "location":
        orderLocation = filterLocation === "desc" ? "asc" : "desc";
        setFilterLocation(filterLocation === "desc" ? "asc" : "desc");
        break;
      default:
        break;
    }

    //on actualise l'ordre d'application des filtres
    const newOrder = [action, ...actionsOrder.filter((c) => c !== action)];

    //on applique les filtres dans l'ordre
    // const sortedBooks = [...myGroupBooksList].sort((a: Book, b: Book) => {
    //   for (const criterion of newOrder) {
    //     if (criterion === "location") {
    //       if (a.location < b.location) return orderLocation === "desc" ? -1 : 1;
    //       if (a.location > b.location) return orderLocation === "desc" ? 1 : -1;
    //     } else if (criterion === "title") {
    //       if (a.title.toLowerCase() < b.title.toLowerCase())
    //         return orderTitle === "desc" ? -1 : 1;
    //       if (a.title.toLowerCase() > b.title.toLowerCase())
    //         return orderTitle === "desc" ? 1 : -1;
    //     } else if (criterion === "author") {
    //       if (a.author.toLowerCase() < b.author.toLowerCase())
    //         return orderAuthor === "desc" ? -1 : 1;
    //       if (a.author.toLowerCase() > b.author.toLowerCase())
    //         return orderAuthor === "desc" ? 1 : -1;
    //     }
    //   }
    //   return 0;
    // });
    const sortedBooks = handleSortedBooks(
      myGroupBooksList,
      orderTitle,
      orderAuthor,
      orderLocation,
      newOrder
    );
    setMyGroupBooksList(sortedBooks);
    setActionsOrder(newOrder);
  };
  const handleClickRemoveBook = async (bookGroupId: number) => {
    if (bookGroupId === null) {
      console.error("Aucun livre sélectionné.");
      return;
    }
    try {
      const reponse = await api.post("/api/library/removeGroupBookFromList", {
        bookGroupId: bookGroupId,
      });
      if (reponse.data.reponse === null) {
        notify("error", reponse.data.result);
      }
      if (reponse.data.reponse) {
        setMyGroupBooksList(
          myGroupBooksList.filter(
            (book: BookType) => book.bookGroupId !== bookGroupId
          )
        );
      }
    } catch (error: unknown) {
      // Utilisation de `unknown` pour éviter `any`
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.message); // Message d'erreur du backend
      } else {
        console.log("Erreur serveur !");
      }
    }
  };

  //message alert
  const notify = (type: string, msg: string) => {
    if (type === "error") toast.warning(() => MsgBorrow(msg));
    if (type === "valid") toast.success(() => MsgAddBook());
  };
  const MsgBorrow = (msg: string) => (
    <>
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        {t("library.libraryBox.alert")}
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>{`${t("library.libraryBox.alertBorrowed")} ${msg}`}</p>
      </div>
    </>
  );
  const MsgAddBook = () => (
    <>
      <div className="bg-orthographe text-white font-bold rounded-t px-4 py-2">
        {t("library.libraryBox.error2")}
      </div>
    </>
  );

  const updateGroupBooksList = (
    newBook: BookToGroupListType,
    bookGroupId: number
  ) => {
    //on fait coincider les types : newBook passe de BookToGroupList à Book
    const validNewBook: BookType = {
      bookGroupId: bookGroupId,
      bookTitle: newBook.bookTitle,
      bookAuthor: newBook.bookAuthor,
      bookLocation: newBook.bookLocation,
      bookPublisher: newBook.bookPublisher,
      bookIsbn: newBook.bookIsbn ? newBook.bookIsbn.toString() : "0",
      bookId: newBook.bookId,
    };

    setMyGroupBooksList((prevList) => {
      const updatedList = [...prevList, validNewBook];
      const sorted = handleSortedBooks(
        updatedList,
        filterTitle,
        filterAuthor,
        filterLocation,
        actionsOrder
      );

      return sorted;
    });
    setTimeout(() => notify("valid", "ok"), 0);
  };

  //const style
  const groupLibraryStyle =
    "border-2 border-orthographe-dark mb-2 bg-white max-w-full overflow-x-auto rounded-md";
  const groupLibraryLegendStyle =
    "border border-orthographe rounded-2xl ml-3 p-2 text-[1.1em] bg-orthographe-25";
  const showGroupLibraryStyle =
    "w-full table-auto border-collapse rounded-lg bg-white ml-2";
  const celStatusActionStyle = "w-6 text-center mr-2";
  const showGroupLibraryThStyle =
    "text-left font-normal italic text-[0.8em] px-2";
  const iconFilterStyle = "w-2.5 inline-block ml-2 cursor-pointer";
  const tableLibraryLineStyle =
    "border-b border-orthographe-25 hover:bg-orthographe-25";
  return (
    <>
      <fieldset className={groupLibraryStyle} id="groupLibrary">
        <legend className={groupLibraryLegendStyle}>{`${t(
          "library.libraryBox.welcomeMyLibrary"
        )} ${group.groupName}`}</legend>
        <div className="overflow-x-auto">
          <div className="max-h-[300px] overflow-y-auto ">
            <table className={showGroupLibraryStyle} id="showGroupLibrary">
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  <th
                    className={`${showGroupLibraryThStyle} ${celStatusActionStyle}`}
                  ></th>
                  <th
                    className={showGroupLibraryThStyle}
                    id="titleBookInLibrary"
                  >
                    <span>{t("library.libraryBox.title")}</span>
                    <img
                      className={iconFilterStyle}
                      alt="sort icon"
                      src={filterTitle === "desc" ? FlecheBas : FlecheHaut}
                      onClick={() => handleClickOrderFilter("title")}
                    />
                  </th>
                  <th
                    className={showGroupLibraryThStyle}
                    id="authorBookInLibrary"
                  >
                    <span className="bookInLibraryClassroom">
                      {t("library.libraryBox.author")}
                    </span>
                    <img
                      className={iconFilterStyle}
                      alt="sort icon"
                      src={filterAuthor === "desc" ? FlecheBas : FlecheHaut}
                      onClick={() => handleClickOrderFilter("author")}
                    />
                  </th>
                  <th
                    className={showGroupLibraryThStyle}
                    id="locationBookInLibrary"
                  >
                    <span className="bookInLibraryClassroom">
                      {t(`library.libraryBox.location.title`)}
                    </span>
                    <img
                      className={iconFilterStyle}
                      alt="sort icon"
                      src={filterLocation === "desc" ? FlecheBas : FlecheHaut}
                      onClick={() => handleClickOrderFilter("location")}
                    />
                  </th>
                  <th
                    className={showGroupLibraryThStyle}
                    id="isbnBookInLibrary"
                  >
                    <span className="bookInLibraryClassroom">ISBN</span>
                  </th>
                </tr>
              </thead>
              <tbody id="myTableGroup" className="text-sm">
                {myGroupBooksList.map((book: BookType) => (
                  <tr
                    key={`${book.bookGroupId}-${book.bookId}`}
                    className={tableLibraryLineStyle}
                  >
                    <td className={celStatusActionStyle}>
                      <img
                        src={DeleteLogo}
                        alt="delete icon"
                        onClick={() => handleClickRemoveBook(book.bookGroupId)}
                      />
                    </td>
                    <td className="pl-2">{book.bookTitle}</td>
                    <td className="pl-2">{book.bookAuthor}</td>
                    <td className="pl-2">
                      {t(`library.libraryBox.location.${book.bookLocation}`)}
                    </td>
                    <td className="pl-2">{book.bookIsbn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showPopup && (
          <FicheBook
            groupId={group.groupId}
            showPopup={setShowPopup}
            isPersonal={false}
            student={null}
            updateLibrary={updateGroupBooksList}
          />
        )}
      </fieldset>
      <div
        className="cursor-pointer px-2 mt-4 border-t-1 border-l-1 border-r-2 border-b-2 border-gray-700 rounded-[10px] bg-calculmental-25 hover:font-bold"
        onClick={() => setShowPopup(true)}
      >
        <img
          src={AddLogo}
          alt="add icon"
          className="w-6 h-6 inline-block mr-2 "
        />
        <span className="inline-block align-bottom">
          {t("library.ficheBox.title")}
        </span>
      </div>
    </>
  );
}
