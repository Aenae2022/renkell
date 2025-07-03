import FondBook from "@pictures/fond/book.png";
import AddLogo from "@pictures/additionner.png";
import { Utilitaires } from "@utils/Utilitaires";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import type {
  BookLibraryShortType,
  BookLocationType,
  BookToGroupListType,
  BookType,
  StudentLibraryType,
} from "@shared/schema/library.schema";
import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";
import { StringNameTitleSchema } from "@shared/schema/fields/stringNameTitle.schema";
import api from "@srcFront/api/axios";

interface FicheBookProps {
  isPersonal: boolean;
  student: StudentLibraryType | null;
  groupId: EntierPositifType;
  showPopup: (value: boolean) => void;
  updateStudentTypeEvent?: (
    userId: EntierPositifType,
    newTypeEvent: string
  ) => void;
  updateLibrary?: (
    newBook: BookToGroupListType,
    bookGroupId: EntierPositifType
  ) => void;
}

function FicheBook({
  isPersonal,
  student,
  groupId,
  showPopup,
  updateStudentTypeEvent,
  updateLibrary,
}: FicheBookProps) {
  const { t } = useTranslation();
  //state pour les input
  const [bookTitle, setBookTitle] = useState<{
    value: string;
    isOfficial: boolean;
  }>({ value: "", isOfficial: false });
  const [bookAuthor, setBookAuthor] = useState<{
    value: string;
    isOfficial: boolean;
  }>({ value: "", isOfficial: false });
  const [bookIsbn, setBookIsbn] = useState<{
    value: string;
    isOfficial: boolean;
    isValid: boolean;
  }>({ value: "", isOfficial: false, isValid: true });
  const [bookLocation, setBookLocation] = useState<BookLocationType>(
    isPersonal ? "per" : "med"
  );
  const [bookNumber, setBookNumber] = useState<EntierPositifType>(1);
  const [bookId, setBookId] = useState<EntierPositifType>(0); //id du livre]
  const [comments, setComments] = useState<BookType[]>([]);
  const [searchedBooks, setSearchedBooks] = useState<BookLibraryShortType[]>(
    []
  );
  const [errorTitle, setErrorTitle] = useState<boolean>(false); // true si le titre est manquant
  //const style
  const ficheBookPStyle = "pl-4 mb-1";
  const ficheBookLabelStyle = "italic text-gray-400 text-sm";
  const ficheBookInputDisableStyle =
    "text-base w-[350px] bg-grammaire-light pl-1";
  const ficheBookInputStyle = "text-base w-[350px] bg-white pl-1 ";
  const ficheBookInputInvalidStyle = "text-base w-[350px] bg-calcul pl-1";
  const buttonStyle =
    "px-2 py-1 mr-3 cursor-pointer text-base bg-gray-400 hover:bg-gray-600 text-center rounded-full border-2 border-gray-500";

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleTitleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value;

    // Mise à jour immédiate de l'input
    setBookTitle((prevBookTitle) => ({
      ...prevBookTitle,
      value: newValue,
    }));

    // Si un timer est déjà lancé, on l'annule
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // On redémarre un timer
    debounceTimer.current = setTimeout(async () => {
      const validTitle = Utilitaires.cleanString(newValue);
      const parsedTitle = StringNameTitleSchema.safeParse(validTitle);
      if (parsedTitle.success) {
        try {
          const response = await api.post(
            "/api/library/getFilteredBooksProposition",
            {
              titleContent: validTitle,
              isbnContent: 0,
            }
          );
          setSearchedBooks(response.data.result);
        } catch (error) {
          console.error("Erreur lors de la récupération des titres :", error);
        }
      }
    }, 300); // délai de 300ms après la dernière frappe
  };

  const handleIsbbnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value;
    const isValid =
      newValue === ""
        ? true
        : Utilitaires.testISBN(newValue.toString() || "") !== 0;
    setBookIsbn((prevBookIsbn) => ({
      ...prevBookIsbn,
      value: newValue,
      isValid,
    }));
  };

  const handleClickAdd = async (book: BookLibraryShortType) => {
    const getReferenceBookInGroupsLibrary = async (
      bookId: number,
      groupId: number
    ) => {
      try {
        const response = await api.post(
          "/api/library/getReferenceBookInGroupLibrary",
          {
            bookId: bookId,
            groupId: groupId,
          }
        );
        if (response.data.reponse !== null) {
          return response.data.result;
        } else {
          return [];
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des titres :", error);
      }
    };
    setBookTitle({ value: book.bookTitle, isOfficial: true });
    setBookAuthor({
      value: book.bookAuthor ?? "",
      isOfficial: !!book.bookAuthor,
    });
    setBookIsbn((prevIsbn) => ({
      ...prevIsbn,
      value: book.bookIsbn ? book.bookIsbn : "",
      isOfficial: book.bookIsbn !== "0" ? true : false,
    }));
    setBookId(book.bookId);
    setSearchedBooks([]);
    setComments(await getReferenceBookInGroupsLibrary(book.bookId, groupId));
  };

  const handleClickSave = async () => {
    setErrorTitle(false);
    //récupération des données du livre
    const newBook: BookToGroupListType = {
      bookId: bookId,
      bookTitle: Utilitaires.validInputString(bookTitle.value),
      bookAuthor: Utilitaires.validInputString(bookAuthor.value),
      bookIsbn: "" + Utilitaires.testISBN(bookIsbn.value),
      bookLocation: bookLocation,
      userId: student !== null ? student.userId : 0,
      groupId: groupId,
      nbBook: bookNumber,
    };

    if (newBook.bookId === 0) {
      //création d'un nouveau livre dans le répertoire en bd
      if (newBook.bookTitle === "") {
        //on vérifie qu'un titre est renseigné
        setErrorTitle(true);
        notify("title");
        return;
      }
      //appel axios pour ajouter le livre dans library
      try {
        const response = await api.post("/api/library/createBook", {
          book: newBook,
        });

        if (response.data.result === null) {
          notify("errorBook");
          return;
        }
        const id = response.data.result;
        newBook.bookId = id;
      } catch (error) {
        console.error("Erreur lors de la création :", error);
        return;
      }
    }

    //on ajoute le livre dans la bibliothèque de classe
    //en tenant compte du type de livre(personel ou collectif)
    const bookWork = newBook.bookLocation === "per" ? 0 : 1;

    // appel axios pour ajouter le livre dans libraryGroup
    try {
      const response = await api.post("/api/library/addBook", {
        book: newBook,
        work: bookWork,
      });

      if (response.data.result === null) {
        notify("errorBook");
        return;
      }

      //s'il s'agit d'un livre personnel, on crée l'emprunt du livre
      if (newBook.bookLocation === "per" && student !== null) {
        const result = await api.post("/api/library/borrowABook", {
          userId: newBook.userId,
          bookGroupId: response.data.result,
          groupId: newBook.groupId,
        });

        if (!result.data.reponse) {
          notify("errorBook");
          return;
        }

        //on change le statut de l'élève donc maj de studentsList (en par la suite de tout le reste du site)
        const containsFour: boolean =
          student.typeEvent?.split(",").map(Number).includes(4) ?? false; //vérifier si student en attente de lecture
        const newStudentEvents = containsFour ? "1, 4" : "1";
        if (updateStudentTypeEvent !== undefined)
          updateStudentTypeEvent(student.userId, newStudentEvents);
      } else {
        if (updateLibrary !== undefined)
          updateLibrary(newBook, response.data.result);
      }

      showPopup(false);
    } catch (error) {
      console.error("Erreur lors de la création :", error);
    }
  };

  //message alert
  const notify = (type: string) => {
    if (type === "title") toast.warning(MsgTitle);
    if (type === "errorBook") toast.warning(MsgErrorBook);
  };
  const MsgTitle = () => (
    <div className="bg-calcul text-white font-bold rounded-t px-4 py-2">
      {t("library.libraryBox.error1")}
    </div>
  );
  const MsgErrorBook = () => (
    <div className="bg-calcul text-white font-bold rounded-t px-4 py-2">
      {t("library.libraryBox.error4")}
    </div>
  );

  return (
    <>
      <div className="fixed z-[9998] w-full h-full top-0 left-0 bg-dictee-25">
        <div
          className="fixed z-[9999] w-[450px] h-[558px] p-2.5 bg-cover bg-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{
            backgroundImage: `url(${FondBook})`,
          }}
        >
          <p className="text-center text-2xl text-conjugaison-dark mt-6 mb-7 ml-5 mr-7.5 bg-white/75 ">
            {t("library.ficheBox.title")}
          </p>
          {/*titre du livre*/}
          <p className={ficheBookPStyle}>
            <label className={ficheBookLabelStyle}>
              {t("library.libraryBox.title")}
            </label>
            <br />
            <input
              type="textarea"
              className={
                bookTitle.isOfficial
                  ? ficheBookInputDisableStyle
                  : errorTitle
                  ? ficheBookInputInvalidStyle
                  : ficheBookInputStyle
              }
              value={bookTitle.value}
              disabled={bookTitle.isOfficial}
              onChange={handleTitleChange}
            />
          </p>

          {/*Proposition de titres déjà en bd si nouveau livre */}
          {searchedBooks.length > 0 && (
            <div className="pr-10">
              <p className="text-sm text-gray-500">
                {t("library.libraryBox.chooseNewBook")}
              </p>
              <ul>
                {searchedBooks.map((book) => {
                  return (
                    <li className="text-xs text-gray-300" key={book.bookId}>
                      <img
                        src={AddLogo}
                        alt="add icon"
                        className="w-3 cursor-pointer mr-2 inline-block"
                        onClick={() => handleClickAdd(book)}
                      />
                      {book.bookTitle} - <em>{book.bookAuthor}</em>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/*auteur*/}
          <p className={ficheBookPStyle}>
            <label className={ficheBookLabelStyle}>
              {t("library.libraryBox.author")}
            </label>
            <br />
            <input
              type="text"
              className={
                bookAuthor.isOfficial
                  ? ficheBookInputDisableStyle
                  : ficheBookInputStyle
              }
              value={bookAuthor.value}
              disabled={bookAuthor.isOfficial ? true : false}
              onChange={(evt) => {
                setBookAuthor((prevBookAuthor) => ({
                  ...prevBookAuthor, // Spread the previous state object to keep other properties like isOfficial
                  value: evt.target.value, // Update only the 'value' property
                }));
              }}
            />
          </p>

          {/*ISBN*/}
          <p className={ficheBookPStyle}>
            <label className={ficheBookLabelStyle}>ISBN</label>
            <br />
            <input
              type="text"
              className={
                bookIsbn.isOfficial
                  ? ficheBookInputDisableStyle
                  : bookIsbn.isValid
                  ? ficheBookInputStyle
                  : ficheBookInputInvalidStyle
              }
              value={bookIsbn.value}
              disabled={bookIsbn.isOfficial ? true : false}
              onChange={handleIsbbnChange}
            />
          </p>

          {/*ajout d'un livre déja présent dans la bibliothèque de classe */}
          {comments.length > 0 && (
            <div className="pr-10">
              <p className="text-conjugaison-dark">
                {t("library.ficheBox.inDbYet")}
              </p>
              <ul>
                {comments.map((book) => {
                  return (
                    <li className="text-xs text-gray-400" key={book.bookId}>
                      {book.bookTitle}{" "}
                      {book.bookAuthor !== "" && <em>-{book.bookAuthor}</em>} (
                      {t(`library.libraryBox.location.${book.bookLocation}`)})
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/*emplacement*/}
          <div className={ficheBookPStyle}>
            <label className={ficheBookLabelStyle}>
              {t("library.libraryBox.location.title")}
            </label>
            <br />
            {/*Livre personnel*/}
            {isPersonal && student !== null ? (
              <p className={ficheBookInputStyle}>
                {t("library.ficheBox.chooseStudent")} {student.userFirstName}{" "}
                {student.userFamilyName}
              </p>
            ) : (
              <select
                className="text-base w-75 bg-white pl-1"
                defaultValue={bookLocation}
                onChange={(evt) => {
                  setBookLocation(evt.target.value as BookLocationType);
                }}
              >
                <option value="med">
                  {t("library.libraryBox.location.med")}
                </option>
                <option value="sch">
                  {t("library.libraryBox.location.sch")}
                </option>
                <option value="roo">
                  {t("library.libraryBox.location.roo")}
                </option>
              </select>
            )}
          </div>

          {/*nombre de livres à ajouter*/}
          {!isPersonal && (
            <p className={ficheBookPStyle}>
              <label className={ficheBookLabelStyle}>
                {t("library.ficheBox.nbBook")}
              </label>
              <input
                type="number"
                className="text-base  bg-white pl-1 w-10 ml-3"
                id="nbBookAdd"
                name="nbBookAdd"
                min="1"
                max="100"
                value={bookNumber}
                onChange={(evt) => setBookNumber(parseInt(evt.target.value))}
              />
            </p>
          )}

          {/*les boutons*/}
          <p className="mt-6 mr-20 text-right">
            <input
              type="button"
              className={buttonStyle}
              value={t("library.ficheBox.abort")}
              onClick={() => {
                showPopup(false);
              }}
            />
            <input
              type="button"
              className={buttonStyle}
              value={t("library.ficheBox.save")}
              onClick={handleClickSave}
            />
          </p>
        </div>
      </div>
    </>
  );
}
export default FicheBook;
