import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/dashboard", isAuthenticated, (req, res) => {
  // On sait que req.session.user existe
  res.json({
    message: "Bienvenue sur votre dashboard",
    user: req.session.user,
  });
});

export default router;
