import express from "express";
import checkInputUserPseudoValid from "../middleware/user/checkInputUserPseudoValid";
import checkInputUserPsswdValid from "../middleware/user/checkInputUserPsswdValid";
import AuthController from "../controller/AuthController";

const router = express.Router();



// Route de connexion
router.post("/login",
    checkInputUserPseudoValid,checkInputUserPsswdValid,
    async (req, res) => await AuthController.validateConnection(req, res));
    
router.post("/logout", (req, res)=>  AuthController.logout(req, res));
router.get("/session", (req, res)=>  AuthController.getSessionUser(req, res));

export default router;
