"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../model/UserModel"));
class DashboardController {
    static async getTeacherLinksList(req, res) {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Non authentifié." });
                return;
            }
            const linksList = await UserModel_1.default.getUserLinksListByUserId(user.userId);
            if (linksList.reponse === null) {
                res.status(400).json({ message: linksList.message, reponse: null, result: [] });
                return;
            }
            res.status(200).json({ message: linksList.message, reponse: linksList.reponse, result: linksList.result });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
}
exports.default = DashboardController;
