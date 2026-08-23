"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInputUserPseudoValid = void 0;
const user_schema_1 = require("@shared/schema/user.schema");
const checkInputUserPseudoValid = async (req, res, next) => {
    const { userPseudo } = req.body;
    if (!userPseudo) {
        res.status(400).json({ message: "L'objet pseudo est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = user_schema_1.UserPseudoSchema.safeParse(userPseudo);
    if (!result.success) {
        res.status(400).json({
            message: "le format du pseudo est invalide",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedUserPseudo = result.data;
    req.body.userPseudo = validatedUserPseudo;
    next();
};
exports.checkInputUserPseudoValid = checkInputUserPseudoValid;
exports.default = exports.checkInputUserPseudoValid;
