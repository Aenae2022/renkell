"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBookWorkValid = void 0;
const checkBookWorkValid = async (req, res, next) => {
    const { work } = req.body;
    if (work === undefined) {
        res.status(400).json({ message: "middleware checkBookWorkValid : work vide" });
        return;
    }
    const regexValid = /^[0-1]{1}$/;
    const isValid = regexValid.test(work);
    if (!isValid) {
        res.status(404).json({ message: "Pas de corrélation userId, groupId" });
        return;
    }
    next();
};
exports.checkBookWorkValid = checkBookWorkValid;
exports.default = exports.checkBookWorkValid;
