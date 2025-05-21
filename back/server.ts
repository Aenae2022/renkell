import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import authRoute from "./routes/authRoute.mjs";
import degemerRoutes from "./routes/degemerRoutes.ts"
// import userRoutes from "./routes/userRoutes.mjs"
// import linksRoutes from "./routes/linksRoutes.mjs"
// import emailRoutes from "./routes/emailRoutes.mjs"
// import libraryRoutes from "./routes/libraryRoutes.mjs"

dotenv.config();


 
const app = express();
app.use(cors());
app.use(express.json());


// Route test
app.get("/", (req, res) => {
    res.send("🚀 API fonctionnelle !");
}); 

app.get("/test", (req, res) => {
    res.send("Test de connexion réussi !");
});
// Utilisation des routes
// app.use("/api/auth", authRoute);// Route d'inscription
// app.use("/api/degemer", degemerRoutes);// Route page d'accueil classes/école
// app.use("/api/user", userRoutes);// Route page d'accueil classes/école
// app.use("/api/links", linksRoutes);// Route page de gestion des raccourcis liens et applications
// app.use("/api/email", emailRoutes);// Route page de gestion des mails
// app.use("/api/library", libraryRoutes);// Route page de l'application librairie

// Lancer le serveur
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
