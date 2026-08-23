"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../lib/prisma/client");
const user_schema_1 = require("@shared/schema/user.schema");
const zod_1 = __importDefault(require("zod"));
class UserModel {
    static async doesRoleExist(role) {
        const action = await client_1.prisma.role.findUnique({
            where: { roleId: role.roleId,
                roleName: role.roleName },
            select: { roleId: true },
        });
        return !!action;
    }
    static async doesUserPseudoExist(userPseudo) {
        const user = await client_1.prisma.user.findUnique({
            where: { userPseudo: userPseudo },
            select: { userPseudo: true },
        });
        return !!user;
    }
    static async doesUserIdExist(userId) {
        const user = await client_1.prisma.user.findUnique({
            where: { userId: userId },
            select: { userId: true },
        });
        return !!user;
    }
    static async doesUserIdStudentExist(userId) {
        const user = await client_1.prisma.user.findUnique({
            where: { userId: userId, userRoles: { some: { roleId: 1 } } },
            select: { userId: true },
        });
        return !!user;
    }
    static async doesUserIdExistInGroupId(userId, groupId) {
        const user = await client_1.prisma.user.findFirst({
            where: {
                userId: userId,
                userGroups: {
                    some: {
                        groupId: groupId,
                    },
                },
            },
            select: { userId: true },
        });
        return !!user;
    }
    static async getOthersTeacherList(userId, schoolId) {
        try {
            const usersDatas = await client_1.prisma.user.findMany({
                where: { userId: { not: userId }, userRoles: { some: { roleId: 2 } }, schoolId: schoolId },
                select: {
                    userId: true,
                    userFamilyName: true,
                    userFirstName: true,
                },
                orderBy: [
                    { userFamilyName: "asc" },
                    { userFirstName: "asc" },
                ]
            });
            if (!usersDatas) {
                return {
                    message: "Il n'y a pas d'autre utilisateur",
                    reponse: null,
                    result: [],
                };
            }
            //Reconstruire le tableau des groupes :
            const usersList = usersDatas.map((g) => ({
                userId: g.userId,
                userName: g.userFirstName + " " + g.userFamilyName,
            }));
            //on valide les données avec Zod
            const parsed = user_schema_1.UserMiniListSchema.safeParse(usersList);
            if (!parsed.success) {
                console.error("Validation Zod échouée :", parsed.error.errors);
                throw new Error("Données invalides");
            }
            return {
                message: "Liste des utilisateurs récupérée avec succès",
                reponse: true,
                result: parsed.data,
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getUserByPseudo(userPseudo) {
        try {
            const userDatas = await client_1.prisma.user.findUnique({
                where: { userPseudo: userPseudo },
                select: {
                    userId: true,
                    userFamilyName: true,
                    userFirstName: true,
                    userPsswd: true,
                    userPseudo: true,
                    userIcon: true,
                    grade: {
                        select: {
                            gradeId: true,
                            gradeName: true,
                        },
                    },
                    school: {
                        select: {
                            schoolId: true,
                            schoolName: true,
                            schoolRef: true,
                        },
                    },
                    userGroups: {
                        select: {
                            principal: true,
                            group: {
                                select: {
                                    groupId: true,
                                    groupName: true,
                                }
                            }
                        },
                        orderBy: {
                            principal: "desc",
                        }
                    },
                    userRoles: {
                        select: {
                            roles: {
                                select: {
                                    roleId: true,
                                    roleName: true,
                                }
                            }
                        },
                        orderBy: {
                            roles: {
                                roleId: "asc",
                            }
                        }
                    },
                },
            });
            if (!userDatas) {
                return {
                    message: "user introuvable",
                    reponse: null,
                    result: [],
                };
            }
            //Reconstruire le tableau des groupes :
            const groupes = userDatas.userGroups.map((g) => ({
                groupId: g.group.groupId,
                groupName: g.group.groupName,
                principal: g.principal
            }));
            // Séparer groupes principal et secondaire 
            const groupesPrincipaux = groupes.filter((g) => g.principal);
            const groupesSecondaires = groupes.filter((g) => !g.principal);
            //construire le tableau des roles
            const roles = userDatas.userRoles.map((r) => ({
                roleId: r.roles.roleId,
                roleName: r.roles.roleName,
            }));
            //définir le role actuel (role de plus bas niveau par défaut)
            const roleAct = roles[0];
            // On reconstruit l'objet final
            const result = {
                userId: userDatas.userId,
                userFamilyName: userDatas.userFamilyName,
                userFirstName: userDatas.userFirstName,
                userPsswd: userDatas.userPsswd,
                userPseudo: userDatas.userPseudo,
                userRoles: roles,
                roleActivated: roleAct,
                userIcon: userDatas.userIcon,
                grade: userDatas.grade, // correspond à GradeSchema
                userSchool: userDatas.school,
                userGroups: groupes,
                groupsP: groupesPrincipaux,
                groupsS: groupesSecondaires,
            };
            //on valide les données avec Zod
            const parsed = user_schema_1.UserDatasConnectSchema.safeParse(result);
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
    static async getUserLinksListByUserPseudo(userPseudo) {
        try {
            const userWithLinks = await client_1.prisma.user.findUnique({
                where: {
                    userPseudo: userPseudo,
                },
                select: {
                    userFamilyName: true,
                    userFirstName: true,
                    userGroups: {
                        where: {
                            principal: true,
                        },
                        select: {
                            group: {
                                select: {
                                    groupId: true,
                                    groupName: true,
                                    classroom: {
                                        select: {
                                            classroomRef: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    userLinks: {
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
            });
            if (!userWithLinks) {
                return {
                    message: "utilisateur introuvable",
                    reponse: null,
                    result: [],
                };
            }
            const myUserWithLinks = {
                userFamilyName: userWithLinks.userFamilyName,
                userFirstName: userWithLinks.userFirstName,
                userClassroomRef: userWithLinks.userGroups[0].group.classroom?.classroomRef,
                userLinks: userWithLinks.userLinks
            };
            if (myUserWithLinks.userLinks.length === 0) {
                return {
                    message: "noLink",
                    reponse: false,
                    result: myUserWithLinks,
                };
            }
            return {
                message: "Liste des liens récupérée avec succès",
                reponse: true,
                result: myUserWithLinks,
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getUserLinksListByUserId(userId) {
        try {
            const userLinks = await client_1.prisma.user.findUnique({
                where: {
                    userId: userId,
                },
                select: {
                    userLinks: {
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
            });
            if (!userLinks) {
                return {
                    message: "utilisateur introuvable",
                    reponse: null,
                    result: [],
                };
            }
            if (userLinks.userLinks.length === 0) {
                return {
                    message: "noLink",
                    reponse: false,
                    result: [],
                };
            }
            const userLinksList = userLinks.userLinks.map((l) => ({
                linkId: l.link.linkId,
                linkRedirection: l.link.linkRedirection,
                linkIcon: l.link.linkIcon,
                linkTitleBr: l.link.linkTitleBr,
                linkTitleFr: l.link.linkTitleFr,
            }));
            return {
                message: "Liste des liens récupérée avec succès",
                reponse: true,
                result: userLinksList,
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getStudentsListBySchool(schoolId) {
        try {
            const usersDatas = await client_1.prisma.user.findMany({
                where: { userRoles: { some: { roleId: 1 } }, schoolId: schoolId },
                select: {
                    userId: true,
                    userFamilyName: true,
                    userFirstName: true,
                    grade: {
                        select: {
                            gradeId: true,
                            gradeName: true,
                        },
                    },
                    schoolId: true,
                    userGroups: {
                        select: {
                            principal: true,
                            group: {
                                select: {
                                    groupId: true,
                                    groupName: true,
                                }
                            }
                        },
                        orderBy: {
                            principal: "desc",
                        }
                    },
                },
                orderBy: [
                    { userFamilyName: "asc" },
                    { userFirstName: "asc" },
                ],
            });
            if (!usersDatas) {
                return {
                    message: "erreur dans la requête",
                    reponse: null,
                    result: [],
                };
            }
            if (usersDatas.length === 0) {
                return {
                    message: "Aucun élève trouvé",
                    reponse: false,
                    result: [],
                };
            }
            return {
                message: "Liste des élèves récupérée avec succès",
                reponse: true,
                result: usersDatas,
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getUserIdentity(userId) {
        try {
            const userDatas = await client_1.prisma.user.findUnique({
                where: { userId: userId },
                select: {
                    userId: true,
                    userFamilyName: true,
                    userFirstName: true,
                    userPsswd: true,
                    userPseudo: true,
                    userIcon: true,
                    userMail: true,
                    grade: {
                        select: {
                            gradeId: true,
                            gradeName: true,
                        },
                    },
                    userGroups: {
                        select: {
                            principal: true,
                            group: {
                                select: {
                                    groupId: true,
                                    groupName: true,
                                }
                            }
                        },
                        orderBy: {
                            principal: "desc",
                        }
                    },
                    userRoles: {
                        select: {
                            roles: {
                                select: {
                                    roleId: true,
                                    roleName: true,
                                }
                            }
                        },
                        orderBy: {
                            roles: {
                                roleId: "asc",
                            }
                        }
                    },
                },
            });
            if (!userDatas) {
                return ({
                    message: "user introuvable",
                    reponse: false,
                    result: null,
                });
            }
            return ({
                message: "user récupéré avec succès",
                reponse: true,
                result: userDatas,
            });
        }
        catch (error) {
            console.error("Erreur dans UserModel, getUserIdentity :", error);
            throw error;
        }
    }
    static async getUserMailById(userId) {
        try {
            const userDatas = await client_1.prisma.user.findUnique({
                where: { userId: userId },
                select: {
                    userMail: true,
                },
            });
            if (!userDatas) {
                return {
                    message: "mail introuvable",
                    reponse: null,
                    result: "",
                };
            }
            //on valide les données avec Zod
            const mailSchema = zod_1.default.string().email();
            const parsed = mailSchema.safeParse(userDatas.userMail);
            if (!parsed.success) {
                console.error("Validation Zod échouée :", parsed.error.errors);
                throw new Error("Mail utilisateur invalide");
            }
            return {
                message: "Mail récupéré avec succès",
                reponse: true,
                result: parsed.data,
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async addStudentToGroup(groupId, userId, principal) {
        try {
            const action = await client_1.prisma.groupUser.create({
                data: {
                    userId: userId,
                    groupId: groupId,
                    principal: principal,
                },
            });
            if (!action) {
                return ({ message: "UserModel, addStudentToGroup, erreur", reponse: null, result: null });
            }
            return ({ message: "réussite", reponse: true, result: action.userId });
        }
        catch (error) {
            console.error("Erreur dans UserModel, addStudentToGroup, :", error);
            throw error;
        }
    }
    static async removeStudentFromGroup(groupId, userId) {
        try {
            const actionRemove = await client_1.prisma.groupUser.deleteMany({
                where: {
                    userId: userId,
                    groupId: groupId
                },
            });
            if (!actionRemove) {
                return ({ message: "UserModel, removeStudentFromGroup, aucune association élève - groupe supprimée", reponse: null });
            }
            return ({ message: "association élève-group supprimée", reponse: true });
        }
        catch (error) {
            console.error("Erreur dans UserModel, removeStudentFromGroup :", error);
            throw error;
        }
    }
    static async updateFamilyName(userId, userFamilyName) {
        try {
            const updateFamilyName = await client_1.prisma.user.update({
                data: {
                    userFamilyName: userFamilyName,
                },
                where: {
                    userId: userId
                },
                select: {
                    userId: true,
                }
            });
            if (!updateFamilyName) {
                return (0);
            }
            return (updateFamilyName.userId);
        }
        catch (error) {
            console.error("Erreur dans UserModel, updateFamilyName :", error);
            throw error;
        }
    }
    static async updateFirstName(userId, userFirstName) {
        try {
            const updateFirstName = await client_1.prisma.user.update({
                data: {
                    userFirstName: userFirstName,
                },
                where: {
                    userId: userId
                },
                select: {
                    userId: true,
                }
            });
            if (!updateFirstName) {
                return (0);
            }
            return (updateFirstName.userId);
        }
        catch (error) {
            console.error("Erreur dans UserModel, updateFirstName :", error);
            throw error;
        }
    }
    static async updateGrade(userId, gradeId) {
        try {
            const updateGrade = await client_1.prisma.user.update({
                data: {
                    gradeId: gradeId,
                },
                where: {
                    userId: userId
                },
                select: {
                    userId: true,
                    grade: {
                        select: {
                            gradeId: true,
                            gradeName: true,
                        }
                    }
                }
            });
            if (!updateGrade || updateGrade.grade == null) {
                return ({ userId: 0, grade: { gradeId: 0, gradeName: "" } });
            }
            const grade = updateGrade.grade;
            return ({
                userId: updateGrade.userId,
                grade,
            });
        }
        catch (error) {
            console.error("Erreur dans UserModel, updateGrade :", error);
            throw error;
        }
    }
}
exports.default = UserModel;
