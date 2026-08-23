"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../lib/prisma/client");
class GradeModel {
    static async doesGradeIdExist(gradeId) {
        const grade = await client_1.prisma.grade.findUnique({
            where: { gradeId: gradeId },
            select: { gradeId: true },
        });
        return !!grade;
    }
}
exports.default = GradeModel;
