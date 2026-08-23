"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        req.user = req.session.user; // 🔥 Stockage pour les autres middlewares
        next();
    }
    else {
        console.error("Utilisateur non authentifié middleware authMiddleware");
        res.status(401).json({ message: "Non autorisé, merci de vous connecter." });
    }
}
