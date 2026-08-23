"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("@srcBack/middleware/authMiddleware");
const checkRoles_1 = require("@srcBack/middleware/checkRoles");
const checkUserIdValid_1 = require("@srcBack/middleware/user/checkUserIdValid");
const DashboardController_1 = __importDefault(require("@srcBack/controller/DashboardController"));
const router = express_1.default.Router();
router.get("/teacherLinksList", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdValid)(), async (req, res) => await DashboardController_1.default.getTeacherLinksList(req, res));
exports.default = router;
