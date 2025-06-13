import type {
  UserMiniType,
  UserSessionConnectType,
} from "@shared/schema/user.schema";
import api from "@srcFront/api/axios";
import { Utilitaires } from "@utils/Utilitaires";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import z from "zod";

function LinksParamsFooter({ usersList }: { usersList: UserMiniType[] }) {
  const user = useOutletContext<UserSessionConnectType>();

  const { t } = useTranslation();
  const [showLinksMany, setShowLinksMany] = useState(false);
  const [askedLink, setAskedLink] = useState("public");
  const [concernedLink, setConcernedLink] = useState("all");
  const [sharedWith, setSharedWith] = useState<number[]>([user.userId]);
  const [userUrl, setUserUrl] = useState("");
  const [messageSend, setMessageSend] = useState("");

  const handleChangeUrl = (url: string) => {
    setUserUrl(url);
  };

  const handleChangeConcerned = (valueType: string) => {
    setConcernedLink(valueType);
  };

  const handleChangeShare = (valueType: string) => {
    setAskedLink(valueType);
    if (valueType === "shared") {
      setShowLinksMany(true);
    } else {
      setShowLinksMany(false);
    }
  };

  const handleChangeShareWith = (otherUserId: string, isChecked: boolean) => {
    const validOtherUserId = parseInt(otherUserId);
    if (isChecked) {
      setSharedWith([...sharedWith, validOtherUserId]);
    } else {
      setSharedWith(sharedWith.filter((id) => id !== validOtherUserId));
    }
  };

  const sendEmail = async () => {
    setMessageSend("");
    if (userUrl === "") {
      setMessageSend(t("userParamsLinks.ask.noLink"));
      return;
    }
    const urlSchema = z.string().url();
    const zUrl = Utilitaires.validateStringWithZodSchema(userUrl, urlSchema);

    if (zUrl === null) {
      setMessageSend(t("userParamsLinks.ask.invalidLink"));
      return;
    }
    try {
      const response = await api.post("/api/email/send-email", {
        recipient: "marenkell@marenkell.com",
        sender: user.userId,
        subject: "Demande de lien",
        message: `Demande de : ${user.userFirstName} ${
          user.userFamilyName
        }. Merci d'ajouter "${zUrl}" dans la liste des liens pour ${concernedLink}. \n C'est un lien ${askedLink}. \n
                  Partagé avec : ${sharedWith.join(", ")}`,
      });

      const data = response.data;
      if (data.result) {
        setUserUrl("");
        setAskedLink("public");
        setSharedWith([user.userId]);
        setShowLinksMany(false);
        setMessageSend(data.message);
      } else {
        setMessageSend("Erreur : " + data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
    }
  };

  return (
    <div>
      <p className="mt-2 text-base mb-2">{t("userParamsLinks.ask.title")}</p>
      <label>{t("userParamsLinks.ask.src")}</label>
      <input
        type="text"
        name="inputUrl"
        className="my-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 "
        placeholder={t("userParamsLinks.linkPlaceholder")}
        onChange={(e) => handleChangeUrl(e.currentTarget.value)}
        value={userUrl}
      />
      <div>
        <input
          type="radio"
          name="linkConcerned"
          className="mx-1"
          value="all"
          checked={concernedLink === "all"}
          onChange={(e) => handleChangeConcerned(e.currentTarget.value)}
        />
        <label className="mr-2">{t("userParamsLinks.concernedAll")}</label>

        <input
          type="radio"
          name="linkConcerned"
          className="mx-1"
          value="teacher"
          checked={concernedLink === "teacher"}
          onChange={(e) => handleChangeConcerned(e.currentTarget.value)}
        />
        <label className="mr-2">{t("userParamsLinks.concernedTeacher")}</label>

        <input
          type="radio"
          name="linkConcerned"
          className="mx-1"
          value="student"
          checked={concernedLink === "student"}
          onChange={(e) => handleChangeConcerned(e.currentTarget.value)}
        />
        <label className="mr-2">{t("userParamsLinks.concernedStudent")}</label>
      </div>
      <div>
        <input
          type="radio"
          name="linkType"
          className="mx-1"
          value="public"
          checked={askedLink === "public"}
          onChange={(e) => handleChangeShare(e.currentTarget.value)}
        />
        <label className="mr-2">{t("userParamsLinks.linksAll")}</label>

        <input
          type="radio"
          name="linkType"
          className="mx-1"
          value="shared"
          checked={askedLink === "shared"}
          onChange={(e) => handleChangeShare(e.currentTarget.value)}
        />
        <label className="mr-2">{t("userParamsLinks.linksMany")}</label>

        <input
          type="radio"
          name="linkType"
          className="mx-1"
          value="personal"
          checked={askedLink === "personal"}
          onChange={(e) => handleChangeShare(e.currentTarget.value)}
        />
        <label className="mr-2">{t("userParamsLinks.linksOne")}</label>
      </div>
      {showLinksMany ? (
        <div>
          <ul className="flex flex-wrap mt-2">
            {usersList.map((userOther) => {
              return (
                <li key={userOther.userId}>
                  <input
                    type="checkbox"
                    className="mx-1"
                    name={`user-${userOther.userId}`}
                    value={userOther.userId}
                    onChange={(e) =>
                      handleChangeShareWith(
                        e.currentTarget.value,
                        e.currentTarget.checked
                      )
                    }
                  />
                  <label className="mr-2">{userOther.userName}</label>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <p className="text-center">
        <button
          className="mt-2 px-2 py-1 cursor-pointer text-center rounded-full border-2 border-gray-400"
          onClick={sendEmail}
        >
          {t("userParamsLinks.ask.send")}
        </button>
      </p>
      {messageSend && <p className="mt-2 text-red-500">{t(messageSend)}</p>}
    </div>
  );
}

export default LinksParamsFooter;
