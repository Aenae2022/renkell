"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInputUserPsswdValid = void 0;
const password_schema_1 = require("@shared/schema/fields/password.schema");
const checkInputUserPsswdValid = async (req, res, next) => {
    const { userPsswd } = req.body;
    if (!userPsswd) {
        res.status(400).json({ message: "L'objet mot de passe est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = password_schema_1.PasswordSchema.safeParse(userPsswd);
    if (!result.success) {
        res.status(400).json({
            message: "le format du mot de passe est invalide",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedPsswd = result.data;
    req.body.userPsswd = validatedPsswd;
    next();
};
exports.checkInputUserPsswdValid = checkInputUserPsswdValid;
exports.default = exports.checkInputUserPsswdValid;
