"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSchoolRefExists = void 0;
const SchoolModel_1 = __importDefault(require("../../model/SchoolModel"));
const school_schema_1 = require("@shared/schema/school.schema");
const checkSchoolRefExists = async (req, res, next) => {
    const { schoolRef } = req.body;
    // 🔒 Vérifie si classroomRef est bien présent
    if (!schoolRef) {
        res.status(400).json({ message: "L'objet classroomRef est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = school_schema_1.SchoolRefSchema.safeParse(schoolRef);
    if (!result.success) {
        res.status(400).json({
            message: "Validation de l'école échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedSchoolRef = result.data;
    req.body.classroomRef = validatedSchoolRef;
    const schoolRefExists = await SchoolModel_1.default.doesSchoolRefExist(validatedSchoolRef);
    if (!schoolRefExists) {
        res.status(404).json({ message: "école introuvable" });
        return;
    }
    next();
};
exports.checkSchoolRefExists = checkSchoolRefExists;
exports.default = exports.checkSchoolRefExists;
