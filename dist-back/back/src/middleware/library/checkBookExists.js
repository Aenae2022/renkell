"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBookExists = void 0;
const LibraryModel_1 = __importDefault(require("@srcBack/model/LibraryModel"));
const library_schema_1 = require("@shared/schema/library.schema");
const checkBookExists = async (req, res, next) => {
    const { book } = req.body;
    if (!book) {
        res.status(400).json({ message: "L'objet book est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = library_schema_1.BookSchema.safeParse(book);
    if (!result.success) {
        res.status(400).json({
            message: "Validation du book échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedBook = result.data;
    req.body.book = validatedBook;
    const bookGroupIdExists = await LibraryModel_1.default.doesBookGroupIdExist(validatedBook.bookGroupId);
    if (!bookGroupIdExists) {
        res.status(404).json({ message: "salle de classe introuvable" });
        return;
    }
    next();
};
exports.checkBookExists = checkBookExists;
exports.default = exports.checkBookExists;
