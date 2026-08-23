"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPeriodValid = void 0;
const library_schema_1 = require("@shared/schema/library.schema");
const checkPeriodValid = async (req, res, next) => {
    const { period } = req.body;
    if (period === undefined || period === null) {
        res.status(400).json({ message: "middleware checkPeriodValid : période manquante", });
        return;
    }
    //validation zod
    const parsePeriod = library_schema_1.PeriodSchema.safeParse(period);
    if (!parsePeriod.success) {
        res.status(400).json({
            message: "Middleware checkPeriodValid : Validation de la période échouée",
            errors: parsePeriod.error.flatten().fieldErrors,
        });
        return;
    }
    next();
};
exports.checkPeriodValid = checkPeriodValid;
exports.default = exports.checkPeriodValid;
