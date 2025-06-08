import type { SchoolType } from "@shared/schema/school.schema";
import type {
  UserSessionConnectType,
  UserWithLinksType,
} from "@shared/schema/user.schema";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import api from "@srcFront/api/axios";
import { boolean } from "zod/v4";
import type { LinkShortType } from "@shared/schema/link.schema";
import Loader from "@components/core/Loader";
import LinkItem from "@components/core/LinkItem";

export default function RaccourcisLink() {
  const user = useOutletContext<UserSessionConnectType>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const actualUrl = useLocation();
  const actualLng = i18n.resolvedLanguage;
  const [loading, setLoading] = useState<boolean>(true);
  const [linksList, setLinksList] = useState<LinkShortType[]>([]);
  const [message, setMessage] = useState<string>("");
  const handleClickLink = (redirection: string) => {
    window.open(redirection, "_blank", "noreferrer");
  };

  useEffect(() => {
    const getUserLinksList = async () => {
      try {
        const linksListSearched = await api.get(
          "/api/dashboard/teacherLinksList"
        );
        console.log("linksListSearched", linksListSearched.data);
        if (linksListSearched.data.result.length === 0)
          setMessage(linksListSearched.data.message);
        setLinksList(linksListSearched.data.result);
        setLoading(false);
        return { linksListSearched };
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          console.log(error.response.data.message); // Message d'erreur du backend
        } else {
          console.log("Erreur serveur dans getUserLinksList!");
        }
      }
    };

    setLoading(true);
    setMessage("");
    setLinksList([]);
    getUserLinksList();
  }, [user]);

  if (loading) return <Loader />;
  if (message !== "")
    return (
      <div className="m-auto bg-red-200  border-3 border-red-600 rounded-md max-w-[60%] text-center p-4">
        <p>{t(message)}</p>
      </div>
    );

  return (
    <div className="flex flex-wrap ">
      {linksList.map((link) => {
        return (
          <LinkItem
            key={link.linkId}
            link={link}
            actualLng={actualLng}
            handleClick={handleClickLink}
          />
        );
      })}
    </div>
  );
}
