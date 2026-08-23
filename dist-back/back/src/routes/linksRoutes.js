"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LinksController_1 = __importDefault(require("@srcBack/controller/LinksController"));
const authMiddleware_1 = require("@srcBack/middleware/authMiddleware");
const checkRoles_1 = require("@srcBack/middleware/checkRoles");
const checkGroupIdPostExists_1 = __importDefault(require("@srcBack/middleware/group/checkGroupIdPostExists"));
const checkLinkAssociationPostValid_1 = require("@srcBack/middleware/link/checkLinkAssociationPostValid");
const checkSchoilIdPostExists_1 = require("@srcBack/middleware/school/checkSchoilIdPostExists");
const checkUserIdValid_1 = require("@srcBack/middleware/user/checkUserIdValid");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/globalLinksListByTeacher", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdPostValid)(), async (req, res) => await LinksController_1.default.getUserLinksListData(req, res));
router.post("/globalLinksListByGroupStudent", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdPostValid)(), checkGroupIdPostExists_1.default, async (req, res) => await LinksController_1.default.globalLinksListByGroupStudent(req, res));
router.post("/getUsersList", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdPostValid)(), checkSchoilIdPostExists_1.checkSchoolIdPostSpeExists, async (req, res) => await LinksController_1.default.getUserList(req, res));
router.post("/linkAssociation", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkLinkAssociationPostValid_1.checkLinkAssociationPostValid, async (req, res) => await LinksController_1.default.linkAssociation(req, res));
exports.default = router;
