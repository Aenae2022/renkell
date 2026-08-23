"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StudentsController_1 = __importDefault(require("@srcBack/controller/StudentsController"));
const authMiddleware_1 = require("@srcBack/middleware/authMiddleware");
const checkRoles_1 = require("@srcBack/middleware/checkRoles");
const checkGroupIdPostExists_1 = __importDefault(require("@srcBack/middleware/group/checkGroupIdPostExists"));
const checkPrincipalGroup_1 = __importDefault(require("@srcBack/middleware/student/checkPrincipalGroup"));
const checkUserIdValid_1 = require("@srcBack/middleware/user/checkUserIdValid");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/getStudentsListBySchool", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER", "ADMIN_SCHOOL"]), (0, checkUserIdValid_1.checkUserIdValid)(), async (req, res) => await StudentsController_1.default.getStudentsListBySchool(req, res));
router.post("/removeStudentFromGroup", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdPostValid)(), checkGroupIdPostExists_1.default, async (req, res) => await StudentsController_1.default.removeStudentFromGroup(req, res));
router.post("/addStudentToGroup", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdPostValid)(), checkGroupIdPostExists_1.default, checkPrincipalGroup_1.default, async (req, res) => await StudentsController_1.default.addStudentToGroup(req, res));
router.post("/getGroupById", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkGroupIdPostExists_1.default, async (req, res) => await StudentsController_1.default.getGroupById(req, res));
exports.default = router;
