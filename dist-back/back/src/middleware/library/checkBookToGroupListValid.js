"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBookToGroupListValid = void 0;
const library_schema_1 = require("@shared/schema/library.schema");
const checkBookToGroupListValid = async (req, res, next) => {
    const { book } = req.body;
    if (!book) {
        res.status(400).json({ message: "middleware checkBookToGroupListValid L'objet book est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = library_schema_1.BookToGroupListSchema.safeParse(book);
    if (!result.success) {
        res.status(400).json({
            message: "middleware checkBookToGroupListValid : Validation du book échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedBook = result.data;
    req.body.book = validatedBook;
    next();
};
exports.checkBookToGroupListValid = checkBookToGroupListValid;
exports.default = exports.checkBookToGroupListValid;
