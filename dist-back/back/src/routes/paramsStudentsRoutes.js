"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SchoolController_1 = __importDefault(require("@srcBack/controller/SchoolController"));
const authMiddleware_1 = require("@srcBack/middleware/authMiddleware");
const checkRoles_1 = require("@srcBack/middleware/checkRoles");
const checkGradePostValid_1 = __importDefault(require("@srcBack/middleware/student/checkGradePostValid"));
const checkPostUserFamilyName_1 = __importDefault(require("@srcBack/middleware/user/checkPostUserFamilyName"));
const checkPostUserFirstName_1 = __importDefault(require("@srcBack/middleware/user/checkPostUserFirstName"));
const checkUserIdValid_1 = require("@srcBack/middleware/user/checkUserIdValid");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/getListGroupPrincipalBySchool", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["ADMIN_SCHOOL"]), (0, checkUserIdValid_1.checkUserIdValid)(), async (req, res) => await SchoolController_1.default.getListGroupPrincipalBySchool(req, res));
router.post("/getUserIdentity", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["ADMIN_SCHOOL"]), (0, checkUserIdValid_1.checkUserIdPostValid)(), async (req, res) => await SchoolController_1.default.getUserIdentity(req, res));
router.post("/updateFamilyName", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["ADMIN_SCHOOL"]), (0, checkUserIdValid_1.checkUserIdPostValid)(), checkPostUserFamilyName_1.default, async (req, res) => await SchoolController_1.default.updateFamilyName(req, res));
//modifie le prénom de l'utilisateur
router.post("/updateFirstName", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["ADMIN_SCHOOL"]), (0, checkUserIdValid_1.checkUserIdPostValid)(), checkPostUserFirstName_1.default, async (req, res) => await SchoolController_1.default.updateFirstName(req, res));
//modifie le niveau scolaire de l'étudiant
router.post("/updateGrade", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["ADMIN_SCHOOL"]), (0, checkUserIdValid_1.checkUserIdPostStudentValid)(), checkGradePostValid_1.default, async (req, res) => await SchoolController_1.default.updateGrade(req, res));
exports.default = router;
