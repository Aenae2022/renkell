"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkInputUserPseudoValid_1 = __importDefault(require("../middleware/user/checkInputUserPseudoValid"));
const checkInputUserPsswdValid_1 = __importDefault(require("../middleware/user/checkInputUserPsswdValid"));
const AuthController_1 = __importDefault(require("../controller/AuthController"));
const router = express_1.default.Router();
// Route de connexion
router.post("/login", checkInputUserPseudoValid_1.default, checkInputUserPsswdValid_1.default, async (req, res) => await AuthController_1.default.validateConnection(req, res));
router.post("/logout", (req, res) => AuthController_1.default.logout(req, res));
router.get("/session", (req, res) => AuthController_1.default.getSessionUser(req, res));
router.post("/roleActivate", 
// checkPostRoleValid,
async (req, res) => await AuthController_1.default.roleActivate(req, res));
router.get("/ping", (req, res) => {
    res.sendStatus(200);
});
exports.default = router;
