"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesController = void 0;
const ArticlesModel_1 = __importDefault(require("@srcBack/model/ArticlesModel"));
class ArticlesController {
    static async getArticlesList(req, res) {
        try {
            const articlesList = await ArticlesModel_1.default.getArticles();
            if (articlesList.reponse === null) {
                res.status(200).json({ message: articlesList.message, reponse: false, result: [] });
                return;
            }
            console.log("articlesList", articlesList);
            //traitement du résultat en bd pour le mettre dans le format attendu par le front
            const formattedArticles = articlesList.result.map((article) => {
                let myColor = "black";
                if (article.domaineId === null) {
                    myColor = "orthographe";
                }
                else if (article.sousDomaineId !== null) {
                    myColor = article.sousDomaine.color;
                }
                else if (article.domaineId !== null) {
                    myColor = article.domaine.color;
                }
                return {
                    id: article.id,
                    color: myColor,
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
            });
            res.status(200).json({ message: articlesList.message, reponse: articlesList.reponse, result: formattedArticles });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: false, result: [] });
            return;
        }
    }
    static async getArticlesByDomaineList(req, res) {
        const { domaine } = req.body;
        try {
            const articlesList = await ArticlesModel_1.default.getArticlesByDomaine(domaine);
            if (articlesList.reponse === null) {
                res.status(200).json({ message: articlesList.message, reponse: false, result: [] });
                return;
            }
            //traitement du résultat en bd pour le mettre dans le format attendu par le front
            const formattedArticles = articlesList.result.map((article) => {
                let myColor = "black";
                if (article.domaineId === null) {
                    myColor = "orthographe";
                }
                else if (article.sousDomaineId !== null) {
                    myColor = article.sousDomaine.color;
                }
                else if (article.domaineId !== null) {
                    myColor = article.domaine.color;
                }
                return {
                    id: article.id,
                    color: myColor,
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
            });
            res.status(200).json({ message: articlesList.message, reponse: articlesList.reponse, result: formattedArticles });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: false, result: [] });
            return;
        }
    }
    static async getArticlesBySousDomaineList(req, res) {
        const { sousDomaine } = req.body;
        try {
            const articlesList = await ArticlesModel_1.default.getArticlesBySousDomaine(sousDomaine);
            if (articlesList.reponse === null) {
                res.status(200).json({ message: articlesList.message, reponse: false, result: [] });
                return;
            }
            //traitement du résultat en bd pour le mettre dans le format attendu par le front
            const formattedArticles = articlesList.result.map((article) => {
                let myColor = "black";
                if (article.domaineId === null) {
                    myColor = "orthographe";
                }
                else if (article.sousDomaineId !== null) {
                    myColor = article.sousDomaine.color;
                }
                else if (article.domaineId !== null) {
                    myColor = article.domaine.color;
                }
                return {
                    id: article.id,
                    color: myColor,
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
            });
            res.status(200).json({ message: articlesList.message, reponse: articlesList.reponse, result: formattedArticles });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: false, result: [] });
            return;
        }
    }
}
exports.ArticlesController = ArticlesController;
exports.default = ArticlesController;
