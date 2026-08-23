"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTitleContentValid = void 0;
const stringNameTitle_schema_1 = require("@shared/schema/fields/stringNameTitle.schema");
const checkTitleContentValid = async (req, res, next) => {
    const { titleContent } = req.body;
    if (!titleContent) {
        res.status(400).json({ message: "erreur middleware checkTitleContentValid" });
        return;
    }
    // ✅ Validation avec Zod
    const result = stringNameTitle_schema_1.StringNameTitleSchema.safeParse(titleContent);
    if (!result.success) {
        res.status(400).json({
            message: "middleware checkTitleContentValid : erreur de validation",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedTitle = result.data;
    req.body.titleContent = validatedTitle;
    next();
};
exports.checkTitleContentValid = checkTitleContentValid;
exports.default = exports.checkTitleContentValid;
