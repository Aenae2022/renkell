"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBookToGroupListExists = void 0;
const LibraryModel_1 = __importDefault(require("@srcBack/model/LibraryModel"));
const library_schema_1 = require("@shared/schema/library.schema");
const checkBookToGroupListExists = async (req, res, next) => {
    const { book } = req.body;
    if (!book) {
        res.status(400).json({ message: "Middleware checkBookToGroupListExists :L'objet book est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = library_schema_1.BookToGroupListSchema.safeParse(book);
    if (!result.success) {
        res.status(400).json({
            message: "Middleware checkBookToGroupListExists : Validation du book échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedBook = result.data;
    req.body.book = validatedBook;
    const bookIdExists = await LibraryModel_1.default.doesBookIdExist(validatedBook.bookId);
    if (!bookIdExists) {
        res.status(404).json({ message: "Middleware checkBookToGroupListExists : livre introuvable" });
        return;
    }
    next();
};
exports.checkBookToGroupListExists = checkBookToGroupListExists;
exports.default = exports.checkBookToGroupListExists;
