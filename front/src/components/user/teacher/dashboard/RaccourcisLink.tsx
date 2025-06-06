import type { SchoolType } from "@shared/schema/school.schema";
import type {
  UserSessionConnectType,
  UserWithLinksType,
} from "@shared/schema/user.schema";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import api from "@srcFront/api/axios";

export default function RaccourcisLink() {
  const user = useOutletContext<UserSessionConnectType>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const actualUrl = useLocation();
  const actualLng = i18n.resolvedLanguage;

  useEffect(() => {
    const getUserLinksList = async () => {
      try {
        const linksListSearched = await api.get(
          "http://localhost:5000/api/dashboard/teacherLinksList"
        );
        console.log("linksListSearched", linksListSearched.data);
        return { linksListSearched };
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          console.log(error.response.data.message); // Message d'erreur du backend
        } else {
          console.log("Erreur serveur dans getUserLinksList!");
        }
      }
    };

    getUserLinksList();
  }, [user]);
  return <div>Raccourcis</div>;
}
