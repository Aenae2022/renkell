"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserPseudoExists = void 0;
const UserModel_1 = __importDefault(require("../../model/UserModel"));
const user_schema_1 = require("@shared/schema/user.schema");
const checkUserPseudoExists = async (req, res, next) => {
    const { userPseudo } = req.body;
    if (!userPseudo) {
        res.status(400).json({ message: "L'objet pseudo est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = user_schema_1.UserPseudoSchema.safeParse(userPseudo);
    if (!result.success) {
        res.status(400).json({
            message: "Validation de l'utilisateur échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedUserPseudo = result.data;
    req.body.userPseudo = validatedUserPseudo;
    const userPseudoExists = await UserModel_1.default.doesUserPseudoExist(validatedUserPseudo);
    if (!userPseudoExists) {
        res.status(404).json({ message: "utilisateur introuvable" });
        return;
    }
    next();
};
exports.checkUserPseudoExists = checkUserPseudoExists;
exports.default = exports.checkUserPseudoExists;
