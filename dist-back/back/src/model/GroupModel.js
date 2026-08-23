"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classroom_schema_1 = require("@shared/schema/classroom.schema");
const client_1 = require("../lib/prisma/client");
class GroupModel {
    static async doesGroupIdExist(groupId) {
        const group = await client_1.prisma.group.findUnique({
            where: { groupId: groupId },
            select: { groupId: true },
        });
        return !!group;
    }
    static async getClassroomRefByGroupId(groupId) {
        try {
            const group = await client_1.prisma.group.findUnique({
                where: { groupId },
                select: {
                    classroom: {
                        select: {
                            classroomRef: true,
                        },
                    },
                },
            });
            //on valide les données avec Zod
            const parsed = classroom_schema_1.ClassroomRefSchema.safeParse(group?.classroom?.classroomRef);
            if (!parsed.success) {
                console.error("Validation Zod échouée :", parsed.error.errors);
                throw new Error("Données utilisateur invalides");
            }
            return {
                message: "User récupéré avec succès",
                reponse: true,
                result: parsed.data,
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getGroupDatasById(groupId) {
        try {
            const group = await client_1.prisma.group.findUnique({
                where: { groupId },
                select: {
                    groupId: true,
                    groupName: true,
                },
            });
            return {
                message: "Group récupéré avec succès",
                reponse: true,
                result: group,
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getGroupPrincipalBySchoolId(schoolId) {
        try {
            const groups = await client_1.prisma.group.findMany({
                where: {
                    classroom: {
                        schoolId: schoolId,
                    },
                    groupPrincipal: true,
                },
                select: {
                    groupId: true,
                    groupName: true,
                    groupPrincipal: true,
                }
            });
            return groups;
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
}
exports.default = GroupModel;
