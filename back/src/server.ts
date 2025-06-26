import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

import authRoute from "./routes/authRoutes";
import degemerRoutes from "./routes/degemerRoutes"
import dashboardRoutes from "./routes/dashboardRoutes";
import linksRoutes from "./routes/linksRoutes";
// import userRoutes from "./routes/userRoutes.mjs"
// import linksRoutes from "./routes/linksRoutes.mjs"
import emailRoutes from "./routes/emailRoutes"
import libraryRoutes from "./routes/libraryRoutes";

dotenv.config();


 
const app = express();
app.use(cors({
  origin: "http://localhost:5173", // <-- ton frontend
  credentials: true               // <-- autorise les cookies
}));app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  rolling: true, // ← Important : rafraîchit la durée du cookie à chaque requête
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 30, // 30 min
  }
}));

// Route test
app.get("/", (req, res) => {
    res.send("🚀 API fonctionnelle !");
}); 

app.get("/test", (req, res) => {
    res.send("Test de connexion réussi !");
});
// Utilisation des routes
app.use("/api/auth", authRoute);// Route d'inscription
app.use("/api/degemer", degemerRoutes);// Route page d'accueil classes/école
app.use("/api/dashboard", dashboardRoutes);// Route page d'accueil utilisateur")
// app.use("/api/user", userRoutes);// Route page d'accueil classes/école
app.use("/api/links", linksRoutes);// Route page de gestion des raccourcis liens et applications
app.use("/api/email", emailRoutes);// Route page de gestion des mails
app.use("/api/library", libraryRoutes);// Route page de l'application librairie

// Lancer le serveur
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
console.log("Début serveur");