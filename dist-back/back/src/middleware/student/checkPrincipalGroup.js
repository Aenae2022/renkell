"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPrincipalGroup = void 0;
const boolean_schema_1 = require("@shared/schema/fields/boolean.schema");
const checkPrincipalGroup = async (req, res, next) => {
    const { principal } = req.body;
    if (principal === undefined || principal === null) {
        res.status(400).json({ message: "checkPrincipalGroup, donnée manquante" });
        return;
    }
    // ✅ Validation avec Zod
    const result = boolean_schema_1.BooleanSchema.safeParse(principal);
    if (!result.success) {
        res.status(400).json({
            message: "checkPrincipalGroup Validation échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    next();
};
exports.checkPrincipalGroup = checkPrincipalGroup;
exports.default = exports.checkPrincipalGroup;
