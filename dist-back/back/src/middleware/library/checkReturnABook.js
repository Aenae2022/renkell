"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkReturnABook = void 0;
const checkReturnABook = async (req, res, next) => {
    const { isReaded } = req.body;
    if (typeof isReaded !== "boolean") {
        res.status(400).json({ message: "Les données ne sont pas valides : groupId, userId, waiting" });
        return;
    }
    next();
};
exports.checkReturnABook = checkReturnABook;
exports.default = exports.checkReturnABook;
