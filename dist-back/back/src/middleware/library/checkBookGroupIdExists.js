"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBookGroupIdExists = void 0;
const LibraryModel_1 = __importDefault(require("@srcBack/model/LibraryModel"));
const entierPositif_schema_1 = require("@shared/schema/fields/entierPositif.schema");
const checkBookGroupIdExists = async (req, res, next) => {
    const { bookGroupId } = req.body;
    if (!bookGroupId) {
        res.status(400).json({ message: "le groupBookId est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = entierPositif_schema_1.EntierPositifSchema.safeParse(bookGroupId);
    if (!result.success) {
        res.status(400).json({
            message: "Validation du bookGroupId échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedBookGroupId = result.data;
    req.body.book = validatedBookGroupId;
    const bookGroupIdExists = await LibraryModel_1.default.doesBookGroupIdExist(validatedBookGroupId);
    if (!bookGroupIdExists) {
        res.status(404).json({ message: "sbookGroupId introuvable" });
        return;
    }
    next();
};
exports.checkBookGroupIdExists = checkBookGroupIdExists;
exports.default = exports.checkBookGroupIdExists;
