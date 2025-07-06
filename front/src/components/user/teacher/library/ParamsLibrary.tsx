import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import iconModify from "@pictures/icons/modifier.png";
import iconDelete from "@pictures/icons/faux.png";
import iconValid from "@pictures/icons/vrai.png";
import { toast } from "react-toastify";
import { Utilitaires } from "@utils/Utilitaires";
import type { GroupMiniType } from "@shared/schema/group.schema";
import { PeriodSchema, type PeriodType } from "@shared/schema/library.schema";
import api from "@srcFront/api/axios";
import { AxiosError } from "axios";
import { StringNameGroupSchema } from "@shared/schema/fields/stringNameGroup.schema";
import ConfirmDialog from "./ConfirmDialog";
import Loader from "@components/core/Loader";

interface ParamsLibraryProps {
  group: GroupMiniType;
}
function ParamsLibrary({ group }: ParamsLibraryProps) {
  const { t } = useTranslation();

  const [periodsList, setPeriodsList] = useState<PeriodType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [periodNameInput, setPeriodNameInput] = useState<string>("");
  const [periodStartInput, setPeriodStartInput] = useState<string>("");
  const [periodEndInput, setPeriodEndInput] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType | null>(null);
  const [modifyPeriod, setModifyPeriod] = useState<PeriodType | null>(null);
  const [modifyNameInput, setModifyNameInput] = useState<string>("");
  const [modifyStartInput, setModifyStartInput] = useState<string>("");
  const [modifyEndInput, setModifyEndInput] = useState<string>("");
  const bornes = { min: "2020-09-01", max: "2040-08-31" };
  //action
  const notify = (type: string, msg: string) => {
    if (type === "error")
      toast.warning(() => MsgError1(msg), {
        autoClose: false, // ❗ Ceci écrase le comportement par défaut
      });
    if (type === "errorInputName") toast.warning(() => MsgError2(), {});
    if (type === "errorInputDate") toast.warning(() => MsgError3(msg), {});
  };
  const MsgError1 = (msg: string) => (
    <>
      <div className="flex flex-col">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 whitespace-nowrap w-auto">
          {t("library.paramsBox.error1Title")}
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>
            {t("library.paramsBox.error1Msg")} <br />
            <em className="italic text-xs">{msg}</em>
          </p>
        </div>
      </div>
    </>
  );
  const MsgError2 = () => (
    <>
      <div className="flex flex-col">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 whitespace-nowrap w-auto">
          {t("library.paramsBox.error2Title")}
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>{t("library.paramsBox.error2Msg")}</p>
        </div>
      </div>
    </>
  );
  const MsgError3 = (msg: string) => (
    <>
      <div className="flex flex-col">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 whitespace-nowrap w-auto">
          {t("library.paramsBox.error2Title")}
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>{msg}</p>
        </div>
      </div>
    </>
  );

  const handleDeleteClick = (period: PeriodType) => {
    setSelectedPeriod(period);
    setShowConfirm(true);
  };

  const handleModifyClick = (period: PeriodType) => {
    setModifyPeriod(period);
    setModifyNameInput(period.periodName);
    setModifyStartInput(
      new Date(period.periodStart).toISOString().split("T")[0]
    );
    setModifyEndInput(new Date(period.periodEnd).toISOString().split("T")[0]);
  };

  const handleConfirmDelete = async () => {
    if (selectedPeriod !== null) {
      try {
        const reponse = await api.post("/api/library/removePeriod", {
          periodId: selectedPeriod.periodId,
        });

        if (reponse.data && reponse.data.reponse) {
          //recharger la liste en local
          setPeriodsList(
            periodsList.filter((p) => p.periodId !== selectedPeriod.periodId)
          );
        } else {
          //notify impossible de supprimer
          notify("error", reponse.data.message);
        }
      } catch (error: unknown) {
        //notify impossible de supprimer
        if (error instanceof AxiosError && error.response) {
          notify("error", error.response.data.message); // Message d'erreur du backend
        } else {
          notify("error", "Erreur serveur !");
        }
      } finally {
        setShowConfirm(false);
        setSelectedPeriod(null);
      }
    }
  };

  const handleAbortClick = () => {
    setModifyPeriod(null);
    setModifyNameInput("");
    setModifyStartInput("");
    setModifyEndInput("");
  };

  const handleUpdateClick = async () => {
    if (modifyPeriod !== null) {
      const periodDatas = { ...modifyPeriod };
      const isoPeriodStart = new Date(periodDatas.periodStart)
        .toISOString()
        .split("T")[0];
      const isoPeriodEnd = new Date(periodDatas.periodEnd)
        .toISOString()
        .split("T")[0];

      console.log(
        "periodDatas.periodStart",
        periodDatas.periodStart,
        typeof periodDatas.periodStart
      );
      //valider les inputs
      if (modifyNameInput !== periodDatas.periodName) {
        const newName = Utilitaires.validInputString(modifyNameInput);
        const parsedNewName = StringNameGroupSchema.safeParse(newName);

        if (parsedNewName.success) {
          periodDatas.periodName = newName;
        } else {
          notify("errorInputName", "");
          return;
        }
      }

      if (isoPeriodStart !== modifyStartInput) {
        console.log("la date a changé");
        const validationDate = Utilitaires.validInputDate(
          modifyStartInput,
          bornes.min,
          bornes.max
        );
        if (validationDate.valid) {
          periodDatas.periodStart = new Date(validationDate.date);
        } else {
          notify("errorInputDate", t("library.paramsBox.errorStart"));
          return;
        }
      }
      if (modifyEndInput !== isoPeriodEnd) {
        const validationDate = Utilitaires.validInputDate(
          modifyEndInput,
          bornes.min,
          bornes.max
        );
        if (validationDate.valid) {
          periodDatas.periodEnd = new Date(validationDate.date);
        } else {
          notify("errorInputDate", t("library.paramsBox.errorEnd"));
          return;
        }
      }

      const parsedPeriodDatas = PeriodSchema.safeParse(periodDatas);
      if (!parsedPeriodDatas.success) {
        const messages = parsedPeriodDatas.error.errors.map(
          (err) => err.message
        );
        messages.forEach((msg) =>
          notify("errorInputDate", t("library.paramsBox." + msg))
        );
        return;
      }
      console.log("onenvoie");
      try {
        const reponse = await api.post("/api/library/updatePeriod", {
          period: periodDatas,
        });

        if (reponse.data && reponse.data.reponse) {
          //recharger la liste en local
          setPeriodsList((prevPeriods) =>
            prevPeriods.map((period) =>
              period.periodId === periodDatas.periodId
                ? {
                    ...period,
                    periodName: periodDatas.periodName,
                    periodStart: periodDatas.periodStart,
                    periodEnd: periodDatas.periodEnd,
                  }
                : period
            )
          );
        } else {
          //notify impossible de modifier
          notify("error", reponse.data.message);
        }
      } catch (error: unknown) {
        //notify impossible de supprimer
        if (error instanceof AxiosError && error.response) {
          notify("error", error.response.data.message); // Message d'erreur du backend
        } else {
          notify("error", "Erreur serveur !");
        }
      } finally {
        setModifyPeriod(null);
        setModifyNameInput("");
        setModifyStartInput("");
        setModifyEndInput("");
      }
    }
  };

  const handleCreateClick = async () => {
    console.log("click");
    const newPeriod: PeriodType = {
      periodName: "",
      periodStart: new Date(),
      periodEnd: new Date(),
      periodType: group.groupId,
      periodId: 0,
    };

    //valider les inputs
    const newName = Utilitaires.validInputString(periodNameInput);
    if (newName === "") {
      //notify titre manquant
      notify("errorInputName", "");
      return;
    } else {
      newPeriod.periodName = newName;
    }

    const newStart = Utilitaires.validInputDate(
      periodStartInput,
      bornes.min,
      bornes.max
    );
    if (newStart.valid) {
      newPeriod.periodStart = new Date(newStart.date);
    } else {
      notify("errorInputDate", t("library.paramsBox.errorStart"));
      return;
    }

    const newEnd = Utilitaires.validInputDate(
      periodEndInput,
      bornes.min,
      bornes.max
    );
    if (newEnd.valid) {
      newPeriod.periodEnd = new Date(newEnd.date);
    } else {
      notify("errorInputDate", t("library.paramsBox.errorEnd"));
      return;
    }

    const parsedNewPeriod = PeriodSchema.safeParse(newPeriod);
    if (!parsedNewPeriod.success) {
      const messages = parsedNewPeriod.error.errors.map((err) => err.message);
      messages.forEach((msg) =>
        notify("errorInputDate", t("library.paramsBox." + msg))
      );
      return;
    }

    console.log("période envoyée ", newPeriod);

    try {
      const reponse = await api.post("/api/library/createPeriod", {
        period: newPeriod,
      });

      if (reponse.data && reponse.data.reponse) {
        newPeriod.periodId = reponse.data.result;
        //recharger la liste en local
        setPeriodsList((prevPeriods) => {
          const newList = [...prevPeriods, newPeriod];
          return newList;
        });
      } else {
        //notify impossible de modifier
        notify("error", reponse.data.message);
      }
    } catch (error: unknown) {
      //notify impossible de supprimer
      if (error instanceof AxiosError && error.response) {
        notify("error", error.response.data.message); // Message d'erreur du backend
      } else {
        notify("error", "Erreur serveur !");
      }
    } finally {
      setPeriodNameInput("");
      setPeriodStartInput("");
      setPeriodEndInput("");
    }
  };

  //récupération des périodes
  useEffect(() => {
    const fetchPeriodsList = async () => {
      setPeriodsList([]); // Réinitialiser la liste avant de la remplir
      setMessage(""); // Réinitialiser le message avant de le remplir
      setIsLoading(true); // Indiquer que le chargement est en cours)

      try {
        const reponse = await api.post("/api/library/getPeriodsList", {
          groupId: group.groupId,
        });

        if (reponse.data && reponse.data.result.length > 0) {
          setPeriodsList(reponse.data.result); // Remplir la liste avec les préiodes récupérées
        } else {
          setMessage(reponse.data.message);
        }
        return reponse.data; //données sous forme data.message(string) data.result(periodsList) data.reponse(boolean|null)
      } catch (error: unknown) {
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

  //const style
  const fieldsetStyle =
    "border-2 border-mesure-dark mb-2 px-2 py-1 bg-white max-w-full  rounded-md";
  const legendStyle =
    "border border-mesure rounded-2xl ml-3 p-2 text-base bg-mesure-50";
  const periodContainerStyle = "flex flex-wrap justify-space-around";
  const iconActionStyle = "w-5 h-5 inline-block ml-2 cursor-pointer";
  const buttonStyle =
    "min-w-15 min-h-6.5 text-base rounded-full border-1 border-zinc-500 m-2.5 px-1.5 bg-zinc-50 cursor-pointer hover:bg-zinc-200";

  console.log(
    "date",
    modifyPeriod?.periodStart,
    typeof modifyPeriod?.periodStart
  );

  if (isLoading) {
    return <Loader />;
  }
  if (message !== "") {
    return <p>{message}</p>;
  }
  return (
    <div>
      {/*périodes par défaut */}
      <fieldset className={fieldsetStyle}>
        <legend className={legendStyle}>
          {t("library.paramsBox.globalTitle")}
        </legend>
        <div className={periodContainerStyle}>
          {periodsList.map((period) => {
            if (period.periodType === "a" || period.periodType === "p") {
              return (
                <div
                  key={period.periodId}
                  className="text-base text-mesure-dark mx-4"
                >
                  {period.periodType === "a"
                    ? `${t("library.paramsBox.yearPeriod")} ${
                        period.periodName
                      } : `
                    : `${t("library.paramsBox.shortPeriod")} ${
                        period.periodName
                      } : `}
                  <em className="text-sm text-gray-700">
                    {`${new Date(
                      period.periodStart
                    ).toLocaleDateString()} -> ${new Date(
                      period.periodEnd
                    ).toLocaleDateString()}`}
                  </em>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </fieldset>

      {/*périodes personnalisées de l'utilisateur*/}
      <fieldset className={fieldsetStyle}>
        <legend className={legendStyle}>
          {t("library.paramsBox.groupTitle")}
        </legend>
        <div className={periodContainerStyle}>
          {periodsList.map((period) => {
            if (period.periodType === group.groupId) {
              if (
                modifyPeriod === null ||
                modifyPeriod.periodId !== period.periodId
              ) {
                return (
                  <div
                    className="text-base text-mesure-dark mx-4"
                    key={period.periodId}
                  >
                    {`${period.periodName} : `}
                    <em className="text-sm text-gray-700">
                      {`${new Date(
                        period.periodStart
                      ).toLocaleDateString()} -> ${new Date(
                        period.periodEnd
                      ).toLocaleDateString()}`}
                    </em>
                    <img
                      className={iconActionStyle}
                      src={iconModify}
                      alt="icone modifier"
                      onClick={() => handleModifyClick(period)}
                    />
                    <img
                      className={iconActionStyle}
                      src={iconDelete}
                      alt="icone supprimer"
                      onClick={() => handleDeleteClick(period)}
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    className="text-base text-mesure-dark bg-mesure-25 p-2 rounded-xl"
                    key={period.periodId}
                  >
                    <input
                      type="texte"
                      id="newName"
                      name="newName"
                      className="bg-amber-50 rounded-xl px-2 w-40 mr-2"
                      value={modifyNameInput}
                      onChange={(e) => setModifyNameInput(e.target.value)}
                    />
                    <em className="text-sm text-gray-700">
                      <input
                        type="date"
                        id="startPM"
                        name="period-startM"
                        min="2020-09-01"
                        className="bg-amber-50 pl-4 rounded-lg mr-2"
                        value={modifyStartInput}
                        onChange={(e) => setModifyStartInput(e.target.value)}
                      />{" "}
                      -{" "}
                      <input
                        type="date"
                        id="endPM"
                        name="period-endM"
                        min="2024-08-31"
                        className="bg-amber-50 pl-4 rounded-lg mr-2"
                        value={modifyEndInput}
                        onChange={(e) => setModifyEndInput(e.target.value)}
                      />
                    </em>
                    <img
                      className={iconActionStyle}
                      src={iconValid}
                      alt="icone valider"
                      onClick={handleUpdateClick}
                    />
                    <img
                      className={iconActionStyle}
                      src={iconDelete}
                      alt="icone supprimer"
                      onClick={() => handleAbortClick()}
                    />
                  </div>
                );
              }
            } else {
              return null;
            }
          })}
        </div>
        <div className="mt-4 bg-mesure-25 p-2 rounded-xl">
          <span>{t("library.paramsBox.addTitle")}</span>
          <p className="my-2">
            {t("library.paramsBox.periodName")}
            <input
              type="texte"
              id="nameP"
              name="period-name"
              className="bg-amber-50 ml-2 rounded-xl px-2 text-sm"
              value={periodNameInput}
              onChange={(e) => setPeriodNameInput(e.target.value)}
            />
          </p>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="startP">
                    {t("library.paramsBox.periodStart")}
                  </label>
                  <input
                    type="date"
                    id="startP"
                    name="period-start"
                    min="2024-08-31"
                    className="bg-amber-50 pl-4 rounded-lg mr-2 text-sm"
                    value={periodStartInput}
                    onChange={(e) => setPeriodStartInput(e.target.value)}
                  />
                </td>
                <td>
                  <label htmlFor="endP">
                    {t("library.paramsBox.periodEnd")}
                  </label>
                  <input
                    type="date"
                    id="endP"
                    name="period-end"
                    min="2024-08-31"
                    className="bg-amber-50 pl-4 rounded-lg text-sm"
                    value={periodEndInput}
                    onChange={(e) => setPeriodEndInput(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value={t("library.paramsBox.save")}
                    className={buttonStyle}
                    onClick={handleCreateClick}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </fieldset>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        period={selectedPeriod}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default ParamsLibrary;
