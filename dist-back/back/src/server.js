"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const degemerRoutes_1 = __importDefault(require("./routes/degemerRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const linksRoutes_1 = __importDefault(require("./routes/linksRoutes"));
// import userRoutes from "./routes/userRoutes.mjs"
// import linksRoutes from "./routes/linksRoutes.mjs"
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
const libraryRoutes_1 = __importDefault(require("./routes/libraryRoutes"));
const studentsRoutes_1 = __importDefault(require("./routes/studentsRoutes"));
const paramsStudentsRoutes_1 = __importDefault(require("./routes/paramsStudentsRoutes"));
const articlesRoutes_1 = __importDefault(require("./routes/articlesRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // <-- ton frontend
    credentials: true // <-- autorise les cookies
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
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
app.use("/api/auth", authRoutes_1.default); // Route d'inscription
app.use("/api/degemer", degemerRoutes_1.default); // Route page d'accueil classes/école
app.use("/api/dashboard", dashboardRoutes_1.default); // Route page d'accueil utilisateur")
// app.use("/api/user", userRoutes);// Route page d'accueil classes/école
app.use("/api/links", linksRoutes_1.default); // Route page de gestion des raccourcis liens et applications
app.use("/api/email", emailRoutes_1.default); // Route page de gestion des mails
app.use("/api/library", libraryRoutes_1.default); // Route page de l'application librairie
app.use("/api/students", studentsRoutes_1.default); // Route page de gestion des élèves par enseignant
app.use('/api/paramsStudents', paramsStudentsRoutes_1.default); //Route de page de gestion des élèves par admin
app.use('/api/articles', articlesRoutes_1.default); //Route de page de gestion des élèves par admin
// Lancer le serveur
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
console.log("Début serveur");
