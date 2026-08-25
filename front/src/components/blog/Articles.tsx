import api from "@srcFront/api/axios";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import Article from "./Article";
import type { ArticleType } from "@shared/schema/article.schema";

interface ArticlesProps {
  principalTagActivated: string;
  secondaryTagActivated: string;
}
function Articles({
  principalTagActivated,
  secondaryTagActivated,
}: ArticlesProps) {
  const [articlesList, setArticlesList] = React.useState<ArticleType[]>([]);
  const [message, setMessage] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  //récupérer les articles en bd
  useEffect(() => {
    const fetchArticlesList = async () => {
      try {
        const reponseArticles = await api.get("/api/articles/articlesList");

        if (reponseArticles.data && reponseArticles.data.reponse) {
          setArticlesList(reponseArticles.data.result); // Remplir la liste avec les articles récupérés
        } else {
          setMessage(reponseArticles.data.message);
        }
        return reponseArticles.data;
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

    const fetchArticlesDomaineList = async (refDomaine: string) => {
      try {
        const reponse = await api.post("/api/articles/articlesDomaineList", {
          domaine: refDomaine,
        });

        if (reponse.data && reponse.data.reponse) {
          setArticlesList(reponse.data.result); // Remplir la liste avec les articles récupérés
        } else {
          setMessage(reponse.data.message);
        }
        return reponse.data;
      } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
          console.error(error.response.data.message);
          setMessage(error.response.data.message); // Message d'erreur du backend
        } else {
          console.error("Erreur serveur !");
          setMessage("Erreur serveur !");
        }
      } finally {
        setIsLoading(false); // Indiquer que le chargement est terminé
      }
    };

    const fetchArticlesSousDomaineList = async (refSousDomaine: string) => {
      try {
        const reponse = await api.post(
          "/api/articles/articlesSousDomaineList",
          {
            sousDomaine: refSousDomaine,
          },
        );

        if (reponse.data && reponse.data.reponse) {
          setArticlesList(reponse.data.result); // Remplir la liste avec les articles récupérés
        } else {
          setMessage(reponse.data.message);
        }
        return reponse.data;
      } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
          console.error(error.response.data.message);
          setMessage(error.response.data.message); // Message d'erreur du backend
        } else {
          console.error("Erreur serveur !");
          setMessage("Erreur serveur !");
        }
      } finally {
        setIsLoading(false); // Indiquer que le chargement est terminé
      }
    };

    setArticlesList([]); // Réinitialiser la liste avant de la remplir
    setMessage(""); // Réinitialiser le message avant de le remplir
    setIsLoading(true); // Indiquer que le chargement est en cours
    //on regarde le degré de filtrage : si on a une tag secondaire, on affiche les articles qui ont cette tag secondaire, sinon on affiche les articles qui ont la tag principale
    if (principalTagActivated === "blog0") {
      fetchArticlesList();
    } else if (secondaryTagActivated !== "") {
      //on charge les articles du sous domaine
      fetchArticlesSousDomaineList(secondaryTagActivated);
    } else {
      //on récupère l'identifiant du domaine
      const refDomaine = principalTagActivated.match(/^([a-zA-Z]+)([0-9]+)$/);
      if (refDomaine) {
        fetchArticlesDomaineList(refDomaine[1]);
      }
    }
  }, [principalTagActivated, secondaryTagActivated]);

  if (isLoading) {
    return <p>Chargement des articles...</p>;
  }
  if (message !== "") {
    return <p>{message}</p>;
  }
  return (
    <div>
      {articlesList.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
}

export default Articles;
