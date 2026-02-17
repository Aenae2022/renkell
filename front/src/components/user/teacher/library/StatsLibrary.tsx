import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Utilitaires } from "@utils/Utilitaires";
import type { GroupMiniType } from "@shared/schema/group.schema";
import type {
  BookStatType,
  PeriodType,
  StudentStatsType,
} from "@shared/schema/library.schema";
import api from "@srcFront/api/axios";
import BooksStatsBox from "./BooksStatsBox";
import StudentsStatsBox from "./StudentsStatsBox";
import StatsBoxSkeleton from "./StatsBoxSkeleton";
import { StudentsStatsDoc } from "@srcFront/document/library/StudentsStatsDoc";
import { pdf } from "@react-pdf/renderer";

interface StatsLibraryProps {
  group: GroupMiniType;
}
function StatsLibrary({ group }: StatsLibraryProps) {
  const { t } = useTranslation();
  const [typeStatSelected, setTypeStateSelected] = useState<
    "books" | "students"
  >("books");
  const [periodSelected, setPeriodSelected] = useState<PeriodType>();
  const [bookMedSelected, setBookMedSelected] = useState<boolean>(true);
  const [bookSchSelected, setBookSchSelected] = useState<boolean>(false);
  const [bookRooSelected, setBookRooSelected] = useState<boolean>(false);
  const [bookPerSelected, setBookPerSelected] = useState<boolean>(false);
  const [periodsList, setPeriodsList] = useState<PeriodType[]>([]);
  const [statsDatas, setStatsDatas] = useState<BookStatType[]>([]);
  const [statsStudentsDatas, setStatsStudentsDatas] = useState<
    StudentStatsType[]
  >([]);

  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const generatePdf = async () => {
    if (periodSelected) {
      setMessage("");
      const blob = await pdf(
        <StudentsStatsDoc
          studentsDatas={statsStudentsDatas}
          period={periodSelected}
        />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      // Crée un lien temporaire et déclenche le téléchargement
      const link = document.createElement("a");
      link.href = url;
      link.download = "document.pdf";
      link.click();

      // Nettoie l'URL après utilisation
      URL.revokeObjectURL(url);
    } else {
      setMessage("noPeriodSelected");
    }
  };
  useEffect(() => {
    const findMatchingPeriod = (testPeriodsList: PeriodType[]) => {
      const today = new Date();
      // Étape 1 : Période propre à un groupe
      const periodsPersonnal = testPeriodsList
        .filter(
          (p) =>
            p.periodType === group.groupId &&
            Utilitaires.isInRange(p.periodStart, p.periodEnd, today),
        )
        .sort(
          (a, b) =>
            new Date(a.periodEnd).getTime() -
            new Date(a.periodStart).getTime() -
            (new Date(b.periodEnd).getTime() -
              new Date(b.periodStart).getTime()),
        );

      if (periodsPersonnal.length > 0) {
        return periodsPersonnal[0];
      }

      // Étape 2 : périodes par défaut de l'appli qui contiennent la date du jour
      const periodsGeneral = testPeriodsList
        .filter(
          (p) =>
            (p.periodType === "a" || p.periodType === "p") &&
            Utilitaires.isInRange(p.periodStart, p.periodEnd, today),
        )
        .sort(
          (a, b) =>
            new Date(a.periodEnd).getTime() -
            new Date(a.periodStart).getTime() -
            (new Date(b.periodEnd).getTime() -
              new Date(b.periodStart).getTime()),
        );
      if (periodsGeneral.length > 0) {
        return periodsGeneral[0];
      }

      // Étape 3 : période ayant la date de fin la plus proche de la date actuelle
      const sortedPeriods = [...testPeriodsList].sort(
        (a, b) =>
          Math.abs(new Date(a.periodEnd).getTime() - today.getTime()) -
          Math.abs(new Date(b.periodEnd).getTime() - today.getTime()),
      );

      return sortedPeriods[0] ?? null;
    };

    const fetchPeriodsList = async () => {
      setPeriodsList([]); // Réinitialiser la liste avant de la remplir
      setMessage(""); // Réinitialiser le message avant de le remplir

      try {
        const reponse = await api.post("/api/library/getPeriodsList", {
          groupId: group.groupId,
        });

        if (reponse.data && reponse.data.result.length > 0) {
          setPeriodsList(reponse.data.result); // Remplir la liste avec les préiodes récupérées
          //on récupère la période à afficher par défaut en fonction de la date du jour
          //la plus petite période personnelle contenant la date du jour
          //sinon la période actuelle
          const matchingPeriod = findMatchingPeriod(reponse.data.result);
          setPeriodSelected(matchingPeriod);
        } else {
          setMessage(reponse.data.message);
        }
        return reponse.data; //données sous forme data.message(string) data.result(periodsList) data.reponse(boolean|null)
      } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
          setMessage(error.response.data.message); // Message d'erreur du backend
        } else {
          setMessage("Erreur serveur !");
        }
      } finally {
        setIsLoading(false); // Indiquer que le chargement est terminé
      }
    };

    fetchPeriodsList();
  }, [group.groupId]);

  //chargement des données en bd en fonction du type de données (books | students) et de la période
  //au premier chargement books - période par défaut
  useEffect(() => {
    //fonction pour récupérer les livres
    const fetchBooksData = async () => {
      setStatsDatas([]); // Réinitialiser la liste avant de la remplir
      setMessage(""); // Réinitialiser le message avant de le remplir
      const locations = [
        bookMedSelected ? "med" : "",
        bookSchSelected ? "sch" : "",
        bookRooSelected ? "roo" : "",
        bookPerSelected ? "per" : "",
      ];
      try {
        const reponse = await api.post("/api/library/getStatsBooksDatas", {
          groupId: group.groupId,
          period: periodSelected,
          locations: locations,
        });
        if (reponse.data && reponse.data.result.length > 0) {
          setStatsDatas(reponse.data.result); // Remplir les datas avec les stats récupérées
        } else {
          setMessage(reponse.data.message);
        }
      } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
          setMessage(error.response.data.message); // Message d'erreur du backend
        } else {
          setMessage("Erreur serveur !");
        }
      }
    };

    //fonction pour récupérer les stats élèves
    const fetchStudentsData = async () => {
      setStatsDatas([]); // Réinitialiser la liste avant de la remplir
      setMessage(""); // Réinitialiser le message avant de le remplir

      const locations = [
        bookMedSelected ? "med" : "",
        bookSchSelected ? "sch" : "",
        bookRooSelected ? "roo" : "",
        bookPerSelected ? "per" : "",
      ];
      try {
        const reponse = await api.post("/api/library/getStatsStudentsDatas", {
          groupId: group.groupId,
          period: periodSelected,
          locations: locations,
        });

        if (reponse.data && reponse.data.result.length > 0) {
          setStatsStudentsDatas(reponse.data.result); // Remplir les datas avec les stats récupérées
        } else {
          setMessage(reponse.data.message);
        }
      } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
          setMessage(error.response.data.message); // Message d'erreur du backend
        } else {
          setMessage("Erreur serveur !");
        }
      }
    };

    if (
      periodSelected !== undefined &&
      (bookMedSelected ||
        bookSchSelected ||
        bookRooSelected ||
        bookPerSelected) &&
      !isLoading
    ) {
      if (typeStatSelected === "books") {
        fetchBooksData();
      } else if (typeStatSelected === "students") {
        fetchStudentsData();
      }
    } else if (
      !isLoading &&
      !bookMedSelected &&
      !bookSchSelected &&
      !bookRooSelected &&
      !bookPerSelected
    ) {
      setMessage("noLocationSelected");
    }
  }, [
    typeStatSelected,
    periodSelected,
    group.groupId,
    isLoading,
    bookMedSelected,
    bookSchSelected,
    bookRooSelected,
    bookPerSelected,
    message,
  ]);

  //const style
  const statsTypeStyle = "text-center";
  const statsButtonStyle = "border-1 border-zinc-500 ";
  const statsSelectedStyle =
    "border-2 border-t-zinc-400 border-l-zinc-400  border-b-zinc-600 border-r-zinc-600 inset-shadow-lg ";
  const chooseDivStyle =
    "flex  p-2 border-1 border-zinc-300 rounded-md bg-zinc-300/80";
  const optionTitleStyle = "mb-0";
  const optionChooseStyle = "mt-1 ";

  //composant à afficher
  let myComponent = <StatsBoxSkeleton />;
  if (isLoading) {
    myComponent = <StatsBoxSkeleton />;
  } else if (message !== "") {
    myComponent = <p>{t("library.statsBox." + message)}</p>;
  } else if (statsDatas.length > 0 && typeStatSelected === "books") {
    myComponent = <BooksStatsBox statsDatas={statsDatas} />;
  } else if (statsStudentsDatas.length > 0 && typeStatSelected === "students") {
    myComponent = <StudentsStatsBox statsDatas={statsStudentsDatas} />;
  }

  return (
    <>
      <div>
        {/* choix des stats livres ou élèves */}
        <p className={statsTypeStyle}>
          <input
            type="button"
            value={t("library.statsBox.library")}
            className={` min-w-15 min-h-6.5 text-xl rounded-md m-2.5 px-1.5 ${
              typeStatSelected === "books"
                ? statsSelectedStyle + "bg-orthographe"
                : statsButtonStyle + "bg-orthographe-light hover:bg-orthographe"
            }
            `}
            onClick={() => setTypeStateSelected("books")}
          />
          <input
            type="button"
            value={t("library.statsBox.student")}
            className={` min-w-15 min-h-6.5 text-xl rounded-md m-2.5 px-1.5 ${
              typeStatSelected === "students"
                ? statsSelectedStyle + "bg-calculmental"
                : statsButtonStyle +
                  "bg-calculmental-light hover:bg-calculmental"
            }
            `}
            onClick={() => setTypeStateSelected("students")}
          />
        </p>
        {/* choix des paramètres */}
        <div className={chooseDivStyle}>
          {/* choix des périodes */}
          <div className="bg-resolution-light p-2 border-1 border-resolution-dark rounded-md mr-5">
            <p className={optionTitleStyle}>
              <label>{t("library.statsBox.period")}</label>
            </p>
            <p
              className={`${optionChooseStyle} bg-white/75 rounded-md text-sm`}
            >
              <select
                value={periodSelected?.periodId ?? 0}
                onChange={(e) =>
                  setPeriodSelected(() => {
                    const myPeriod = periodsList.find(
                      (p) => p.periodId === parseInt(e.target.value),
                    );
                    return myPeriod;
                  })
                }
              >
                {periodsList.map((period, index) => {
                  return (
                    <option
                      value={period.periodId}
                      key={`${period.periodId} ${index}`}
                    >
                      {period.periodType === "a"
                        ? t("library.statsBox.selectedBloazPeriod") +
                          " " +
                          period.periodName
                        : period.periodType === "p"
                          ? t("library.statsBox.selectedPeriod") +
                            " " +
                            period.periodName
                          : period.periodName}
                    </option>
                  );
                })}
              </select>
            </p>
          </div>
          {/* choix des livres à prendre en compte */}
          <div className="bg-resolution-light p-2 border-1 border-resolution-dark rounded-md ">
            <p className={optionTitleStyle}>
              {t("library.statsBox.chooseBooks")}
            </p>
            <div className={`${optionChooseStyle} flex justify-around`}>
              <div className="mr-3 flex items-center">
                <input
                  className="w-5 h-5"
                  type="checkbox"
                  id="med"
                  name="libraries"
                  value="med"
                  checked={bookMedSelected}
                  onChange={(e) => setBookMedSelected(e.target.checked)}
                />
                <label
                  className="bg-white/75 px-2 rounded-r-md text-sm h-5 "
                  htmlFor="med"
                >
                  {t("library.statsBox.bookLocation_med")}{" "}
                </label>
              </div>
              <div className="mr-3 flex items-center">
                <input
                  className="w-5 h-5"
                  type="checkbox"
                  id="sch"
                  name="libraries"
                  value="sch"
                  checked={bookSchSelected}
                  onChange={(e) => setBookSchSelected(e.target.checked)}
                />
                <label
                  className="bg-white/75 px-2 rounded-r-md text-sm h-5 "
                  htmlFor="sch"
                >
                  {t("library.statsBox.bookLocation_sch")}
                </label>
              </div>
              <div className="mr-3 flex items-center">
                <input
                  className="w-5 h-5"
                  type="checkbox"
                  id="roo"
                  name="libraries"
                  value="roo"
                  checked={bookRooSelected}
                  onChange={(e) => setBookRooSelected(e.target.checked)}
                />
                <label
                  className="bg-white/75 px-2 rounded-r-md text-sm h-5 "
                  htmlFor="roo"
                >
                  {t("library.statsBox.bookLocation_roo")}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="w-5 h-5"
                  type="checkbox"
                  id="per"
                  name="libraries"
                  value="per"
                  checked={bookPerSelected}
                  onChange={(e) => setBookPerSelected(e.target.checked)}
                />
                <label
                  className="bg-white/75 px-2 rounded-r-md text-sm h-5 "
                  htmlFor="per"
                >
                  {t("library.statsBox.bookLocation_per")}
                </label>
              </div>
            </div>
          </div>
          {typeStatSelected === "students" ? (
            <input
              type="button"
              value={t("library.statsBox.print")}
              className={`rounded-md m-2 px-1 text-sm border-2 border-zinc-800 text-wrap
            `}
              onClick={generatePdf}
            />
          ) : null}
        </div>
      </div>
      {myComponent}
    </>
  );
}

export default StatsLibrary;
