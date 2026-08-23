"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSchoolValid = void 0;
const SchoolModel_1 = __importDefault(require("../../model/SchoolModel"));
const school_schema_1 = require("@shared/schema/school.schema");
const checkSchoolValid = async (req, res, next) => {
    const { school } = req.body;
    // 🔒 Vérifie si school est bien présent
    if (!school) {
        res.status(400).json({ message: "L'objet school est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = school_schema_1.SchoolSchema.safeParse(school);
    if (!result.success) {
        res.status(400).json({
            message: "Validation de l'école échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedSchool = result.data;
    req.body.school = validatedSchool;
    // ✅ Cas particulier : schoolId === 0 ⇒ passer au next sans vérifier schoolRef
    if (validatedSchool.schoolId === 0) {
        return next();
    }
    // ✅ Vérifie si l'école existe en base
    const schoolRefExists = await SchoolModel_1.default.doesSchoolRefExist(validatedSchool.schoolRef);
    if (!schoolRefExists) {
        res.status(404).json({ message: "École introuvable" });
        return;
    }
    // 🔁 Passe à la suite
    return next();
};
exports.checkSchoolValid = checkSchoolValid;
exports.default = exports.checkSchoolValid;
