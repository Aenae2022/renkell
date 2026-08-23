"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkDomaineExists_1 = __importDefault(require("@srcBack/middleware/core/checkDomaineExists"));
const ArticlesController_1 = __importDefault(require("@srcBack/controller/ArticlesController"));
const express_1 = __importDefault(require("express"));
const checkSousDomaineExists_1 = __importDefault(require("@srcBack/middleware/core/checkSousDomaineExists"));
const router = express_1.default.Router();
router.post("/articlesDomaineList", checkDomaineExists_1.default, async (req, res) => await ArticlesController_1.default.getArticlesByDomaineList(req, res));
router.post("/articlesSousDomaineList", checkSousDomaineExists_1.default, async (req, res) => await ArticlesController_1.default.getArticlesBySousDomaineList(req, res));
router.get("/articlesList", async (req, res) => await ArticlesController_1.default.getArticlesList(req, res));
exports.default = router;
