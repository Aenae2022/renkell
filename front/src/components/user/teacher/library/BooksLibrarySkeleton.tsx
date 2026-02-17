import { useTranslation } from "react-i18next";
import FlecheBas from "@pictures/icons/flecheBas.png";

function BooksLibrarySkeleton() {
  const { t } = useTranslation();
  //const style
  const groupLibraryStyle =
    "border-2 border-orthographe-dark mb-2 bg-white max-w-full h-[348px] animate-pulse overflow-x-auto rounded-md";
  const groupLibraryLegendStyle =
    "border border-orthographe rounded-2xl ml-3 p-2 text-[1.1em] w-[340px] h-[44px] animate-pulse bg-orthographe-25";
  const showGroupLibraryStyle =
    "w-full table-auto border-collapse rounded-lg bg-white ml-2";
  const celStatusActionStyle = "w-6 text-center mr-2";
  const showGroupLibraryThStyle =
    "text-left font-normal italic text-[0.8em] px-2";
  const iconFilterStyle = "w-2.5 inline-block ml-2 cursor-pointer";
  const tableLibraryLineStyle =
    "border-b border-orthographe-25 h-[24px] animate-pulse bg-gray-300";
  return (
    <>
      <fieldset className={groupLibraryStyle} id="groupLibrary">
        <legend className={groupLibraryLegendStyle}></legend>
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
                      src={FlecheBas}
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
                      src={FlecheBas}
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
                      src={FlecheBas}
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
                {Array.from({ length: 11 }).map((_, i) => (
                  <tr className={tableLibraryLineStyle} key={i}></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </fieldset>
    </>
  );
}

export default BooksLibrarySkeleton;
