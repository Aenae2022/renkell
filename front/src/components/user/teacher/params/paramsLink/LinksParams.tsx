import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import { useOutletContext } from "react-router-dom";
import type {
  UserMiniType,
  UserSessionConnectType,
} from "@shared/schema/user.schema";
import type { LinkDataType } from "@shared/schema/link.schema";
import api from "@srcFront/api/axios";
import MatterLinksList from "./MatterLinksList";
import LinksParamsFooter from "./LinksParamsFooter";
import LinksParamsSkeleton from "./LinksParamsSkeleton";

//ici les données pour le fonctionnement du classeur

type GeneralProps = {
  typeRef: string;
  idRef: number;
};

export default function LinksParams({ typeRef, idRef }: GeneralProps) {
  const user = useOutletContext<UserSessionConnectType>();

  const { t } = useTranslation();

  const [linksList, setlinksList] = useState<LinkDataType[]>([]);
  const [usersList, setUsersList] = useState<UserMiniType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const linksContainerColorVariants = {
    mathematiques: "rounded-md p-2 bg-mathematiques-25",
    francais: "rounded-md p-2 bg-francais-25",
    multidomaine: "rounded-md p-2 bg-conjugaison-25",
    autre: "rounded-md p-2 bg-orthographe-25",
  } as const;

  const handleChange = async (linkId: number, isChecked: boolean) => {
    // Définir les paramètres nécessaires
    const refId = idRef ? idRef : 0; // Assure-toi que cette clé existe dans ton objet
    const type = typeRef ? typeRef : ""; // Exemple, adapte selon ta structure
    const operation = isChecked ? "addAssociation" : "removeAssociation"; // Déterminer l'opération

    try {
      if (refId !== 0 && type !== "") {
        const changeAssociationWord = await changeLinkAssociation({
          refId,
          linkId,
          type,
          operation,
        }); // Attente de l'API
        if (changeAssociationWord.reponse) {
          // Mise à jour locale des liens (sans re-render global)
          setlinksList((prevLinks) =>
            prevLinks.map((link) =>
              link.linkId === linkId
                ? { ...link, isAssociated: isChecked }
                : link
            )
          );
        }
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'association :", error);
    }
  };

  //récupérer la liste des liens et des utilisateurs

  useEffect(() => {
    const fetchLinks = async () => {
      setIsLoading(true);
      setError(null);
      setlinksList([]);
      setUsersList([]);

      try {
        const linkPromise =
          typeRef === "group" && idRef !== undefined
            ? getGlobalLinksListStudentGroup({
                userId: user.userId,
                groupId: idRef,
              })
            : typeRef === "user" && idRef !== undefined
            ? getGlobalLinksListTeacher({ userId: user.userId })
            : null;

        const userPromise = getUsersList({
          userId: user.userId,
          schoolId: user.userSchool?.schoolId,
        });

        const [linksResponse, usersResponse] = await Promise.all([
          linkPromise,
          userPromise,
        ]);

        // Gestion des liens
        if (linksResponse.reponse) {
          setlinksList(linksResponse.result);
        } else {
          setlinksList([]);
          setError(linksResponse.message);
        }
        // Gestion des utilisateurs
        if (usersResponse.reponse) {
          setUsersList(usersResponse.result);
        } else {
          setUsersList([]);
          setError(usersResponse.message);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          setError("Erreur lors du chargement des données : " + error);
        } else {
          setError("Erreur lors du chargement des données.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, [user, idRef, typeRef]);

  const getGlobalLinksListStudentGroup = async ({
    userId,
    groupId,
  }: {
    userId: number;
    groupId: number;
  }) => {
    try {
      const response = await api.post(
        "/api/links/globalLinksListByGroupStudent",
        {
          userId,
          groupId,
        }
      );

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.message);
        console.log("Erreur serveur !");
      }
    }
  };

  const getGlobalLinksListTeacher = async ({ userId }: { userId: number }) => {
    try {
      const response = await api.post("/api/links/globalLinksListByTeacher", {
        userId,
      });

      return response.data;
    } catch (error: unknown) {
      // Utilisation de `unknown` pour éviter `any`
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.message); // Message d'erreur du backend
      } else {
        console.log("Erreur serveur !");
      }
    }
  };

  const getUsersList = async ({
    userId,
    schoolId,
  }: {
    userId: number;
    schoolId: number | undefined;
  }) => {
    if (schoolId !== undefined && !isNaN(schoolId)) {
      try {
        const response = await api.post("/api/links/getUsersList", {
          userId: userId,
          schoolId: schoolId,
        });
        return response.data;
      } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
          console.log(error.response.data.message); // Message d'erreur du backend
        } else {
          console.log("Erreur serveur !");
        }
      }
    }
    // ✅ Return par défaut si schoolId est manquant ou invalide
    return {
      message: "Pas d'école",
      reponse: false,
      result: [],
    };
  };

  const changeLinkAssociation = async ({
    refId,
    linkId,
    type,
    operation,
  }: {
    refId: number;
    linkId: number;
    type: string;
    operation: string;
  }) => {
    try {
      const response = await api.post("/api/links/linkAssociation", {
        refId,
        linkId,
        type,
        operation,
      });

      return response.data;
    } catch (error: unknown) {
      // Utilisation de `unknown` pour éviter `any`
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.message); // Message d'erreur du backend
      } else {
        console.log("Erreur serveur !");
      }
    }
  };

  // Texte d'explication du header
  const textExplicationPrincipal = (
    <p className="text-xl">{t("userParamsLinks.textExplication.principal")}</p>
  );
  const textExplicationSecondary = (
    <p className="text-sm">{t("userParamsLinks.textExplication.secondary")}</p>
  );
  const myComponentHeader = (
    <>
      {textExplicationPrincipal} {textExplicationSecondary}
    </>
  );

  let myListComponent;

  if (isLoading) {
    myListComponent = <LinksParamsSkeleton />;
  } else if (error) {
    myListComponent = <p className="text-red-500">{error}</p>;
  } else if (linksList.length > 0) {
    const matters = [
      ...new Set(linksList.map((link) => link.matter.toLowerCase())),
    ]; //on récupère les différents domaines

    myListComponent = matters.map((matter, index) => {
      const linksByMatter = linksList.filter(
        (link) => link.matter.toLowerCase() === matter
      );
      const linksContainerStyle =
        linksContainerColorVariants[
          matter as keyof typeof linksContainerColorVariants
        ];

      const publicLinksByMatter = linksByMatter.filter(
        (link) => link.totalUsersWithAccess === 0
      );
      const publicContainer = (
        <MatterLinksList
          title=""
          linksList={publicLinksByMatter}
          matter={matter}
          handleChange={handleChange}
        />
      );

      const privateGroupLinksByMatter = linksByMatter.filter(
        (link) => link.totalUsersWithAccess > 1
      );
      const privateGroupContainer = (
        <MatterLinksList
          title="userParamsLinks.linksMany"
          linksList={privateGroupLinksByMatter}
          matter={matter}
          handleChange={handleChange}
        />
      );

      const privatePersonnalLinksByMatter = linksByMatter.filter(
        (link) => link.totalUsersWithAccess === 1
      );
      const privatePersonalContainer = (
        <MatterLinksList
          title="userParamsLinks.linksOne"
          linksList={privatePersonnalLinksByMatter}
          matter={matter}
          handleChange={handleChange}
        />
      );

      const titleMatter = "userParamsLinks.matter." + matter;
      return (
        <div key={`${index}-${matter}`} className={linksContainerStyle}>
          <p className="text-sm font-semibold mb-1">{t(titleMatter)}</p>
          {publicContainer}
          {privateGroupContainer}
          {privatePersonalContainer}
        </div>
      );
    });
  } else {
    myListComponent = <p>Aucun lien n'a été trouvé.</p>;
  }

  return (
    <div className="text-sm">
      {myComponentHeader}
      {myListComponent}
      <LinksParamsFooter usersList={usersList} />
    </div>
  );
}
