"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../lib/prisma/client");
class ArticlesModel {
    static async getArticles() {
        try {
            const articles = await client_1.prisma.article.findMany({
                select: {
                    id: true,
                    titleKey: true,
                    descriptionKey: true,
                    logoSrc: true,
                    logoAlt: true,
                    languages: true,
                    createdAt: true,
                    links: {
                        select: {
                            index: true, // 1,2,3 pour <1>, <2>
                            label: true, // Charivari
                            url: true,
                        }
                    },
                    domaine: {
                        select: {
                            id: true,
                            titleKey: true,
                            color: true,
                        },
                    },
                    sousDomaine: {
                        select: {
                            id: true,
                            titleKey: true,
                            color: true,
                        },
                    },
                    componentKey: true,
                    domaineId: true,
                    sousDomaineId: true,
                },
            });
            if (articles.length === 0) {
                return {
                    message: "article introuvable",
                    reponse: false,
                    result: [],
                };
            }
            return {
                message: "Liste des articles récupérée avec succès",
                reponse: true,
                result: articles,
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getArticlesByDomaine(domaine) {
        try {
            const articlesByDomaine = await client_1.prisma.article.findMany({
                where: {
                    domaineId: domaine,
                },
                select: {
                    id: true,
                    titleKey: true,
                    descriptionKey: true,
                    logoSrc: true,
                    logoAlt: true,
                    languages: true,
                    createdAt: true,
                    links: {
                        select: {
                            index: true, // 1,2,3 pour <1>, <2>
                            label: true, // Charivari
                            url: true,
                        }
                    },
                    domaine: {
                        select: {
                            id: true,
                            titleKey: true,
                            color: true,
                        },
                    },
                    sousDomaine: {
                        select: {
                            id: true,
                            titleKey: true,
                            color: true,
                        },
                    },
                    domaineId: true,
                    sousDomaineId: true,
                },
            });
            if (articlesByDomaine.length === 0) {
                return {
                    message: "article introuvable",
                    reponse: false,
                    result: [],
                };
            }
            return {
                message: "Liste des articles récupérée avec succès",
                reponse: true,
                result: articlesByDomaine,
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    //avoir tous les articles d'un sous domaine
    static async getArticlesBySousDomaine(sousDomaine) {
        try {
            const articlesBySousDomaine = await client_1.prisma.article.findMany({
                where: {
                    sousDomaineId: sousDomaine,
                },
                select: {
                    id: true,
                    titleKey: true,
                    descriptionKey: true,
                    logoSrc: true,
                    logoAlt: true,
                    languages: true,
                    createdAt: true,
                    links: {
                        select: {
                            index: true, // 1,2,3 pour <1>, <2>
                            label: true, // Charivari
                            url: true,
                        }
                    },
                    domaine: {
                        select: {
                            id: true,
                            titleKey: true,
                            color: true,
                        },
                    },
                    sousDomaine: {
                        select: {
                            id: true,
                            titleKey: true,
                            color: true,
                        },
                    },
                    domaineId: true,
                    sousDomaineId: true,
                },
            });
            if (articlesBySousDomaine.length === 0) {
                return {
                    message: "article introuvable",
                    reponse: false,
                    result: [],
                };
            }
            return {
                message: "Liste des articles récupérée avec succès",
                reponse: true,
                result: articlesBySousDomaine,
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
}
exports.default = ArticlesModel;
