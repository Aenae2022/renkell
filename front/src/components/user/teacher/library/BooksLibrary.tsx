import GroupBooksLibrary from "./GroupBooksLibrary";
import { useState } from "react";
import { useEffect } from "react";
import type { GroupMiniType } from "@shared/schema/group.schema";
import type { BookType } from "@shared/schema/library.schema";
import api from "@srcFront/api/axios";
import { AxiosError } from "axios";
import BooksLibrarySkeleton from "./BooksLibrarySkeleton";
import { useTranslation } from "react-i18next";

function BooksLibrary({ group }: { group: GroupMiniType }) {
  const [groupBooksList, setGroupBooksList] = useState<BookType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchGroupBooksList = async () => {
      setGroupBooksList([]); // Réinitialiser la liste avant de la remplir
      setMessage(""); // Réinitialiser le message avant de le remplir
      setIsLoading(true); // Indiquer que le chargement est en cours

      try {
        const reponse = await api.post("/api/library/groupBooksList", {
          groupId: group.groupId,
        });

        if (reponse.data) {
          setGroupBooksList(reponse.data.result); // Remplir la liste avec les livres récupérés
        } else {
          setMessage(reponse.data.message);
        }
        return reponse.data; //données sous forme data.message(string) et data.result(bookslist)
        // return(response.data);
      } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
          console.error(error.response.data.message); // Message d'erreur du backend
        } else {
          console.error("Erreur serveur !");
        }
      } finally {
        setIsLoading(false); // Indiquer que le chargement est terminé
      }
    };
    fetchGroupBooksList();
  }, [group.groupId]);

  //composant à afficher
  if (isLoading) {
    return <BooksLibrarySkeleton />;
  }
  if (message !== "") {
    return <p>{t("library.libraryBox." + message)}</p>;
  }
  return (
    <div>
      <GroupBooksLibrary groupBooksList={groupBooksList} group={group} />
    </div>
  );
}

export default BooksLibrary;
