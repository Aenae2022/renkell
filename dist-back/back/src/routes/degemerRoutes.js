"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkSchoolRefExists_1 = require("../middleware/school/checkSchoolRefExists");
const DegemerController_1 = __importDefault(require("../controller/DegemerController"));
const checkUserPseudoExists_1 = __importDefault(require("../middleware/user/checkUserPseudoExists"));
const checkSchoolValid_1 = __importDefault(require("../middleware/school/checkSchoolValid"));
const checkClassroomRefExistsInSchool_1 = __importDefault(require("../middleware/classroom/checkClassroomRefExistsInSchool"));
const router = express_1.default.Router();
router.post("/classrooms", checkSchoolRefExists_1.checkSchoolRefExists, async (req, res) => await DegemerController_1.default.getClassroomsList(req, res));
router.post("/classroomLinksList", checkSchoolValid_1.default, checkClassroomRefExistsInSchool_1.default, async (req, res) => await DegemerController_1.default.getClassroomLinksList(req, res));
router.post("/userLinksList", checkSchoolValid_1.default, checkUserPseudoExists_1.default, async (req, res) => await DegemerController_1.default.getUserLinksList(req, res));
exports.default = router;
