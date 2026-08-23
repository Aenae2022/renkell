"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LinksController_1 = __importDefault(require("@srcBack/controller/LinksController"));
const authMiddleware_1 = require("@srcBack/middleware/authMiddleware");
const checkRoles_1 = require("@srcBack/middleware/checkRoles");
const checkMailPostValid_1 = require("@srcBack/middleware/link/checkMailPostValid");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/send-email", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkMailPostValid_1.checkMailPostValid, async (req, res) => await LinksController_1.default.newLinkMail(req, res));
exports.default = router;
