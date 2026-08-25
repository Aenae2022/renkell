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
import studentsRoutes from "./routes/studentsRoutes";
import paramsSchoolRoutes from "./routes/paramsStudentsRoutes";
import paramsStudentsRoutes from "./routes/paramsStudentsRoutes";
import articlesRoutes from "./routes/articlesRoutes";
dotenv.config();


 
const app = express();

app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

console.log("NODE_ENV =", process.env.NODE_ENV);
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  rolling: true, // ← Important : rafraîchit la durée du cookie à chaque requête
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
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
app.use("/api/auth", (req, res, next) => {
  console.log("🔥 API AUTH ATTEINTE :", req.method, req.originalUrl);
  next();
});
app.use("/api/auth", authRoute);// Route d'inscription
app.use("/api/degemer", degemerRoutes);// Route page d'accueil classes/école
app.use("/api/dashboard", dashboardRoutes);// Route page d'accueil utilisateur")
// app.use("/api/user", userRoutes);// Route page d'accueil classes/école
app.use("/api/links", linksRoutes);// Route page de gestion des raccourcis liens et applications
app.use("/api/email", emailRoutes);// Route page de gestion des mails
app.use("/api/library", libraryRoutes);// Route page de l'application librairie
app.use("/api/students", studentsRoutes);// Route page de gestion des élèves par enseignant
app.use('/api/paramsStudents', paramsStudentsRoutes) //Route de page de gestion des élèves par admin
app.use('/api/articles', articlesRoutes) //Route de page de gestion des élèves par admin

// Lancer le serveur
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
console.log("Début serveur");