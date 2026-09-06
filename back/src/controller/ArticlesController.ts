import ArticlesModel from "@srcBack/model/ArticlesModel";
import { Request, Response } from "express";


export class ArticlesController {
  
    static async getArticlesList(
    req: Request,
    res: Response) {
      
      try {
        const articlesList = await ArticlesModel.getArticles();
        if (articlesList.reponse === null) {
           res.status(200).json({ message: articlesList.message, reponse: false, result: [] });
           return
        }


        //traitement du résultat en bd pour le mettre dans le format attendu par le front
        const formattedArticles = articlesList.result.map((article: any) => {
          let myColor = "black";
          if(article.domaineId === null) {
            myColor = "orthographe";
          }
          else if(article.sousDomaineId !== null) {
            myColor = article.sousDomaine.color;
          } else if(article.domaineId !== null) {
            myColor = article.domaine.color;
          }
          return {
            id: article.id,
            color : myColor,
            titleKey: article.titleKey,
            descriptionKey: article.descriptionKey,
            logoSrc: article.logoSrc,
            logoAlt: article.logoAlt,
            languages: article.languages,
            createdAt: article.createdAt,
            links: article.links,
            domaineId: article.domaineId,
            sousdomaineId: article.sousDomaineId,
            componentKey: article.componentKey,
          };
        })
  
         res.status(200).json({ message: articlesList.message, reponse: articlesList.reponse, result: formattedArticles});
        return
      } catch (error) {
        console.error("Erreur dans le contrôleur :", error);
         res.status(500).json({ message: "Erreur serveur", reponse: false, result: [] });
         return
      }
    }
    
    static async getArticlesByDomaineList(
    req: Request,
    res: Response) 
    {
      const { domaine } = req.body;
      
      try {
        const articlesList = await ArticlesModel.getArticlesByDomaine(domaine);
        if (articlesList.reponse === null) {
           res.status(200).json({ message: articlesList.message, reponse: false, result: [] });
           return
        }

        //traitement du résultat en bd pour le mettre dans le format attendu par le front
        const formattedArticles = articlesList.result.map((article: any) => {
          let myColor = "black";
          if(article.domaineId === null) {
            myColor = "orthographe";
          }
          else if(article.sousDomaineId !== null) {
            myColor = article.sousDomaine.color;
          } else if(article.domaineId !== null) {
            myColor = article.domaine.color;
          }
          return {
            id: article.id,
            color : myColor,
            titleKey: article.titleKey,
            descriptionKey: article.descriptionKey,
            logoSrc: article.logoSrc,
            logoAlt: article.logoAlt,
            languages: article.languages,
            createdAt: article.createdAt,
            links: article.links,
            domaineId: article.domaineId,
            sousdomaineId: article.sousDomaineId,
            componentKey: article.componentKey,
          };
        })
  
         res.status(200).json({ message: articlesList.message, reponse: articlesList.reponse, result: formattedArticles});
        return
      } catch (error) {
        console.error("Erreur dans le contrôleur :", error);
         res.status(500).json({ message: "Erreur serveur", reponse: false, result: [] });
         return
      }
    }

    static async getArticlesBySousDomaineList(
    req: Request,
    res: Response) 
    {
      const { sousDomaine } = req.body;
      
      try {
        const articlesList = await ArticlesModel.getArticlesBySousDomaine(sousDomaine);
        if (articlesList.reponse === null) {
           res.status(200).json({ message: articlesList.message, reponse: false, result: [] });
           return
        }

        //traitement du résultat en bd pour le mettre dans le format attendu par le front
        const formattedArticles = articlesList.result.map((article: any) => {
          let myColor = "black";
          if(article.domaineId === null) {
            myColor = "orthographe";
          }
          else if(article.sousDomaineId !== null) {
            myColor = article.sousDomaine.color;
          } else if(article.domaineId !== null) {
            myColor = article.domaine.color;
          }
          return {
            id: article.id,
            color : myColor,
            titleKey: article.titleKey,
            descriptionKey: article.descriptionKey,
            logoSrc: article.logoSrc,
            logoAlt: article.logoAlt,
            languages: article.languages,
            createdAt: article.createdAt,
            links: article.links,
            domaineId: article.domaineId,
            sousdomaineId: article.sousDomaineId,
            componentKey: article.componentKey,
          };
        })
  
         res.status(200).json({ message: articlesList.message, reponse: articlesList.reponse, result: formattedArticles});
        return
      } catch (error) {
        console.error("Erreur dans le contrôleur :", error);
         res.status(500).json({ message: "Erreur serveur", reponse: false, result: [] });
         return
      }
    }

    
}
export default ArticlesController;
