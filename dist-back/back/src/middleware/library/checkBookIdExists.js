"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBookIdExists = void 0;
const LibraryModel_1 = __importDefault(require("@srcBack/model/LibraryModel"));
const entierPositif_schema_1 = require("@shared/schema/fields/entierPositif.schema");
const checkBookIdExists = async (req, res, next) => {
    const { bookId } = req.body;
    if (!bookId) {
        res.status(400).json({ message: "middleware checkBookIdExists : le groupBookId est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = entierPositif_schema_1.EntierPositifSchema.safeParse(bookId);
    if (!result.success) {
        res.status(400).json({
            message: "middleware checkBookIdExists : Validation zod du bookId échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedbookId = result.data;
    req.body.book = validatedbookId;
    const bookIdExists = await LibraryModel_1.default.doesBookIdExist(validatedbookId);
    if (!bookIdExists) {
        res.status(404).json({ message: "middleware checkBookIdExists : bookId introuvable" });
        return;
    }
    next();
};
exports.checkBookIdExists = checkBookIdExists;
exports.default = exports.checkBookIdExists;
