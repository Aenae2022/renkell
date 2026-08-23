"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../lib/prisma/client");
class ClassroomModel {
    static async doesClassroomRefExist(classroomRef) {
        const classroom = await client_1.prisma.classroom.findUnique({
            where: { classroomRef: classroomRef },
            select: { classroomRef: true },
        });
        return !!classroom;
    }
    static async doesClassroomRefExistInSchool(classroomRef, schoolId) {
        const classroom = await client_1.prisma.classroom.findFirst({
            where: { classroomRef: classroomRef,
                schoolId: schoolId,
            },
            select: { classroomRef: true },
        });
        return !!classroom;
    }
    static async getClassroomLinksListByRef(classroomRef) {
        try {
            const classroomWithLinks = await client_1.prisma.classroom.findUnique({
                where: {
                    classroomRef: classroomRef,
                },
                select: {
                    classroomRef: true,
                    group: {
                        select: {
                            groupId: true,
                            groupName: true,
                            groupLinks: {
                                select: {
                                    link: {
                                        select: {
                                            linkId: true,
                                            linkRedirection: true,
                                            linkIcon: true,
                                            linkTitleBr: true,
                                            linkTitleFr: true,
                                        },
                                    },
                                },
                                orderBy: {
                                    linkId: "asc",
                                },
                            }
                        },
                    },
                },
            });
            if (!classroomWithLinks) {
                return {
                    message: "Salle de classe introuvable",
                    reponse: null,
                    result: [],
                };
            }
            if (classroomWithLinks.group?.groupLinks.length === 0) {
                return {
                    message: "noLink",
                    reponse: false,
                    result: classroomWithLinks,
                };
            }
            return {
                message: "Liste des liens récupérée avec succès",
                reponse: true,
                result: classroomWithLinks,
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
}
exports.default = ClassroomModel;
