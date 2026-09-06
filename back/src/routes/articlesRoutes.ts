import checkDomaineExists from "@srcBack/middleware/core/checkDomaineExists";
import ArticlesController  from "@srcBack/controller/ArticlesController";
import express from "express";
import checkSousDomaineExists from "@srcBack/middleware/core/checkSousDomaineExists";

const router = express.Router();

router.post("/articlesDomaineList",
    checkDomaineExists,
    async (req, res) => await ArticlesController.getArticlesByDomaineList(req, res));

router.post("/articlesSousDomaineList",
    checkSousDomaineExists,
    async (req, res) => await ArticlesController.getArticlesBySousDomaineList(req, res));

router.get("/articlesList",
    async (req, res) => await ArticlesController.getArticlesList(req, res));



export default router;
