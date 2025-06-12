import Loader from "@components/core/Loader";
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

//ici les données pour le fonctionnement du classeur

type GeneralProps = {
  typeRef: string;
  idRef: number;
};

export default function LinksParams({ typeRef, idRef }: GeneralProps) {
  const user = useOutletContext<UserSessionConnectType>();

  const { t, i18n } = useTranslation();
  const actualLng = i18n.resolvedLanguage;

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

  //   const handleChange = async (linkId : number, isChecked:boolean) => {

  //       // Définir les paramètres nécessaires
  //       const refId = idRef?idRef : 0; // Assure-toi que cette clé existe dans ton objet
  //       const type = typeRef?typeRef:''; // Exemple, adapte selon ta structure
  //       const operation = isChecked ? "addAssociation" : "removeAssociation"; // Déterminer l'opération

  //       try {

  //           await changeLinkAssociation({ refId, linkId, type, operation }); // Attente de l'API
  //           // Mise à jour locale des liens (sans re-render global)
  //           setlinksList((prevLinks) =>
  //               prevLinks.map((link) =>
  //                   link.linkId === linkId ? { ...link, isAssociated: isChecked } : link
  //               )
  //           );
  //       } catch (error) {
  //           console.error("Erreur lors de la modification de l'association :", error);
  //       }
  //   };

  //récupérer la liste des liens

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

  // const changeLinkAssociation = async ({refId, linkId, type, operation}:{refId : number; linkId:number; type:string; operation: string}) =>{

  //     try {
  //         const response = await axios.post("http://localhost:5000/api/links/linkAssociation", {
  //             refId,
  //             linkId,
  //             type,
  //             operation
  //         });

  //         return(response.data);

  //     } catch (error: unknown) { // Utilisation de `unknown` pour éviter `any`
  //         if (error instanceof AxiosError && error.response) {
  //             console.log(error.response.data.message); // Message d'erreur du backend
  //         } else {
  //         console.log("Erreur serveur !");
  //         }
  //     }
  // }

  //composant qui s'affiche sur la page du classeur en fonction des onglets sélectionnés
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
    myListComponent = <Loader />;
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
      {/* <MyComponentFooter user={user} usersList={usersList} /> */}
    </div>
  );
}

// const MyComponentFooter = ({
//   user,
//   usersList,
// }: {
//   user: User;
//   usersList: ShortUser[];
// }) => {
//   const { t } = useTranslation();
//   const [showLinksMany, setShowLinksMany] = useState(false);
//   const [askedLink, setAskedLink] = useState("public");
//   const [sharedWith, setSharedWith] = useState<number[]>([user.id]);
//   const [userUrl, setUserUrl] = useState("");
//   const [messageSend, setMessageSend] = useState("");

//   const handleChangeUrl = (url: string) => {
//     setUserUrl(url);
//   };
//   const handleChangeShare = (valueType: string) => {
//     setAskedLink(valueType);
//     if (valueType === "shared") {
//       setShowLinksMany(true);
//     } else {
//       setShowLinksMany(false);
//     }
//   };
//   const handleChangeShareWith = (otherUserId: string, isChecked: boolean) => {
//     const validOtherUserId = parseInt(otherUserId);
//     if (isChecked) {
//       setSharedWith([...sharedWith, validOtherUserId]);
//     } else {
//       setSharedWith(sharedWith.filter((id) => id !== validOtherUserId));
//     }
//   };

//   const sendEmail = async () => {
//     setMessageSend("");
//     if (userUrl === "") {
//       setMessageSend(t("userParamsLinks.ask.noLink"));
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/email/send-email",
//         {
//           recipient: "marenkell@marenkell.com",
//           sender: user.id,
//           subject: "Demande de lien",
//           message: `Demande de : ${user.firstName} ${
//             user.familyName
//           }. Merci d'ajouter "${userUrl}" dans la liste des liens. \n C'est un lien ${askedLink}. \n
//                 Partagé avec : ${sharedWith.join(", ")}`,
//         }
//       );

//       const data = response.data;
//       if (data.result) {
//         setUserUrl("");
//         setAskedLink("public");
//         setSharedWith([user.id]);
//         setShowLinksMany(false);
//         setMessageSend(data.message);
//       } else {
//         setMessageSend("Erreur : " + data.message);
//       }
//     } catch (error) {
//       console.error("Erreur lors de l'envoi de l'e-mail :", error);
//     }
//   };

//   return (
//     <div>
//       <p className="mt-2 text-base mb-2">{t("userParamsLinks.ask.title")}</p>
//       <label>{t("userParamsLinks.ask.src")}</label>
//       <input
//         type="text"
//         name="inputUrl"
//         className="my-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 "
//         placeholder={t("userParamsLinks.linkPlaceholder")}
//         onChange={(e) => handleChangeUrl(e.currentTarget.value)}
//         value={userUrl}
//       />

//       <div>
//         <input
//           type="radio"
//           name="linkType"
//           className="mx-1"
//           value="public"
//           checked={askedLink === "public"}
//           onChange={(e) => handleChangeShare(e.currentTarget.value)}
//         />
//         <label className="mr-2">{t("userParamsLinks.linksAll")}</label>

//         <input
//           type="radio"
//           name="linkType"
//           className="mx-1"
//           value="shared"
//           checked={askedLink === "shared"}
//           onChange={(e) => handleChangeShare(e.currentTarget.value)}
//         />
//         <label className="mr-2">{t("userParamsLinks.linksMany")}</label>

//         <input
//           type="radio"
//           name="linkType"
//           className="mx-1"
//           value="personal"
//           checked={askedLink === "personal"}
//           onChange={(e) => handleChangeShare(e.currentTarget.value)}
//         />
//         <label className="mr-2">{t("userParamsLinks.linksOne")}</label>
//       </div>
//       {showLinksMany ? (
//         <div>
//           <ul className="flex flex-wrap mt-2">
//             {usersList.map((userOther) => {
//               return (
//                 <li key={userOther.user_id}>
//                   <input
//                     type="checkbox"
//                     className="mx-1"
//                     name={`user-${userOther.user_id}`}
//                     value={userOther.user_id}
//                     onChange={(e) =>
//                       handleChangeShareWith(
//                         e.currentTarget.value,
//                         e.currentTarget.checked
//                       )
//                     }
//                   />
//                   <label className="mr-2">{userOther.user_name}</label>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       ) : null}
//       <p className="text-center">
//         <button
//           className="mt-2 px-2 py-1 cursor-pointer text-center rounded-full border-2 border-gray-400"
//           onClick={sendEmail}
//         >
//           {t("userParamsLinks.ask.send")}
//         </button>
//       </p>
//       {messageSend && <p className="mt-2 text-red-500">{t(messageSend)}</p>}
//     </div>
//   );
// };
