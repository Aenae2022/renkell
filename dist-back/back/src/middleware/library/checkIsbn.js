"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsbn = void 0;
const checkIsbn = async (req, res, next) => {
    const { isbnContent } = req.body;
    if (isbnContent === undefined) {
        res.status(400).json({ message: "middleware checkIsbn : isbn vide" });
        return;
    }
    const regexValidISBN = /^[0-9]{13}$/;
    const isValidIsbn = regexValidISBN.test(isbnContent);
    if (!isValidIsbn) {
        req.body.isbnContent = 0;
    }
    next();
};
exports.checkIsbn = checkIsbn;
exports.default = exports.checkIsbn;
