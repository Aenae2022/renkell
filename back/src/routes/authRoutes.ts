import express from "express";
import checkInputUserPseudoValid from "../middleware/user/checkInputUserPseudoValid";
import checkInputUserPsswdValid from "../middleware/user/checkInputUserPsswdValid";
import AuthController from "../controller/AuthController";
import { isAuthenticated } from "@srcBack/middleware/authMiddleware";
import { checkPostRoleValid } from "@srcBack/middleware/user/checkPostRoleValid";
const router = express.Router();



// Route de connexion
router.post("/login",
    checkInputUserPseudoValid,checkInputUserPsswdValid,
    //async (req, res) => await AuthController.validateConnection(req, res));
    async (req, res) => {
    console.log("🔥 LOGIN ROUTE ATTEINTE");
    await AuthController.validateConnection(req, res);
  })
    
router.post("/logout", (req, res)=>  AuthController.logout(req, res));
router.get("/session", (req, res)=>  AuthController.getSessionUser(req, res));
router.post("/roleActivate", 
  // checkPostRoleValid,
  async (req, res) => await AuthController.roleActivate(req, res));

router.get("/ping", (req, res) => {
  res.sendStatus(200);
});

export default router;
