"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../lib/prisma/client");
class SchoolModel {
    static async doesSchoolRefExist(schoolRef) {
        const school = await client_1.prisma.school.findUnique({
            where: { schoolRef: schoolRef },
            select: { schoolRef: true },
        });
        return !!school;
    }
    static async doesSchoolIdExist(schoolId) {
        const school = await client_1.prisma.school.findUnique({
            where: { schoolId: schoolId },
            select: { schoolId: true },
        });
        return !!school;
    }
    static async createSchool(schoolName, schoolRef, schoolCp, schoolCity) {
        return client_1.prisma.school.create({
            data: {
                schoolName,
                schoolRef,
                schoolCp,
                schoolCity,
            },
        });
    }
    static async getClassroomsListByRef(schoolRef) {
        try {
            const schoolWithClasses = await client_1.prisma.school.findUnique({
                where: {
                    schoolRef: schoolRef,
                },
                select: {
                    schoolId: true,
                    schoolName: true,
                    schoolRef: true,
                    classrooms: {
                        select: {
                            classroomId: true,
                            classroomNumber: true,
                            classroomOrder: true,
                            classroomBorderColor: true,
                            classroomBackgroundColor: true,
                            classroomColor: true,
                            classroomRef: true,
                            group: {
                                select: {
                                    groupName: true,
                                },
                            },
                        },
                        orderBy: {
                            classroomOrder: "asc",
                        },
                    },
                },
            });
            if (!schoolWithClasses) {
                return {
                    message: "École introuvable",
                    reponse: null,
                    result: null,
                };
            }
            if (schoolWithClasses.classrooms.length === 0) {
                return {
                    message: "Pas de classes trouvées pour cette école",
                    reponse: false,
                    result: schoolWithClasses,
                };
            }
            return {
                message: "Liste des classes récupérée avec succès",
                reponse: true,
                result: schoolWithClasses,
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
}
exports.default = SchoolModel;
