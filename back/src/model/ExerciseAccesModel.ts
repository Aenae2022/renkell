import { EntierPositifType } from '@shared/schema/fields/entierPositif.schema';
import { prisma } from '../lib/prisma/client';
import { decryptExerciseToken, encryptExerciseToken, generateExerciseToken, hashExerciseToken } from '../../utils/exerciseAcces';
import { Prisma } from '@prisma/client';
import { ExerciseLinkDatasSchema, ExerciseLinkDatasType } from '@shared/schema/link.schema';
import { StringNameType } from '@shared/schema/fields/stringName.schema';
import { GroupMiniType, GroupsListForExerciseType } from '@shared/schema/group.schema';
import { tokenClairType } from '@shared/schema/fields/token.schema';
import { PasswordShortType } from '@shared/schema/fields/password.schema';
import bcrypt from "bcrypt";

class ExerciseAccesModel {

    static async createExerciseAccess(groupId: EntierPositifType, userId: EntierPositifType)
        : Promise<{ token: string, tokenHash: string }> {
        const newOriginalToken = generateExerciseToken();
        const newEncryptedToken = encryptExerciseToken(newOriginalToken);
        const newHashedToken = hashExerciseToken(newOriginalToken);
        try {
            await prisma.exerciseAccess.create({
                data: {
                    groupId: groupId,
                    userId: userId,
                    tokenEncrypted: newEncryptedToken,
                    tokenHash: newHashedToken,
                },
            });

            return { token: newOriginalToken, tokenHash: newHashedToken };
        }
        catch (error) {
            throw error;
        }

    }

    static async createLoginShortAccess(userId: EntierPositifType, userPsswd: PasswordShortType)
        : Promise<boolean> {
        
        try {
            const newHashedPsswd = await bcrypt.hash(userPsswd,10);
            const isCreate = await prisma.userSimpleLogin.create({
                data: {
                    userId: userId,
                    passwordSimpleHash: newHashedPsswd,
                },
            });

            return !!isCreate;
        }
        catch (error) {
            throw error;
        }

    }

    static async createExerciseLink(tokenHash: string, linkDatas: ExerciseLinkDatasType)
        : Promise<boolean> {

        try {
            const addLink = await prisma.exerciselinks.create({
                data: {
                    linkExId: linkDatas.linkExId,
                    linkParams:
                        linkDatas.linkParams === null
                            ? Prisma.DbNull
                            : linkDatas.linkParams,
                    linkRedirection: linkDatas.linkRedirection,
                    linkActif: false,
                    tokenHash: tokenHash
                },
            });
            return (true);
        }
        catch (error) {
            console.error("Erreur dans createExerciseLink :", error)
            throw error;
        }
    }


    static async getExistingExerciseAccess(groupId: EntierPositifType, userId: EntierPositifType)
        : Promise<{ token: string, tokenHash: string } | null> {
        try {
            const exerciseAccess = await prisma.exerciseAccess.findUnique({
                select: {
                    tokenEncrypted: true,
                    tokenHash: true,
                },
                where: {
                    groupId_userId: {
                        groupId: groupId,
                        userId: userId,
                    },
                },
            })
            if (exerciseAccess) {
                return {
                    token: decryptExerciseToken(exerciseAccess.tokenEncrypted),
                    tokenHash: exerciseAccess.tokenHash
                };
            }
            return null;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'accès à l\'exercice :', error);
            throw error;
        }
    }

    static async getGroupExerciseLinksList(groupId: EntierPositifType)
        : Promise<{ token: string, exerciseLinksList: ExerciseLinkDatasType[] } | null> {
        try {
            const exerciseLinksList = await prisma.exerciseAccess.findFirst({
                select: {
                    tokenEncrypted: true,
                    exerciselinks: {
                        where: {
                            linkActif: true
                        },
                        select: {
                            linkExId: true,
                            linkParams: true,
                            linkRedirection: true
                        }
                    }
                },
                where: {
                    groupId: groupId
                }

            })
            let linksListFormatted: ExerciseLinkDatasType[] = []
            if (exerciseLinksList) {
                for (const element of exerciseLinksList.exerciselinks) {

                    const parsedLink = ExerciseLinkDatasSchema.safeParse(element)
                    if (parsedLink.success) {
                        linksListFormatted.push(parsedLink.data)
                    }
                    else {
                        console.error('Erreur lors de la récupération du lien exercise :', element.linkExId);
                        console.error("zod message : ", parsedLink.error.issues)
                    }
                }
                return {
                    token: decryptExerciseToken(exerciseLinksList.tokenEncrypted),
                    exerciseLinksList: linksListFormatted
                };
            }
            return null;
        } catch (error) {
            console.error('Erreur lors de la récupération des liens exercices :', error);
            throw error;
        }
    }

    static async getGroupDataByExerciseToken(linkDatas: ExerciseLinkDatasType, tokenClair: tokenClairType)
        : Promise<GroupMiniType | null> {
        const tokenHash = hashExerciseToken(tokenClair);
        try {
            const groupInBd = await prisma.exerciselinks.findFirst({
                select: {
                    exerciseAccess: {
                        select: {
                            group: {
                                select: {
                                    groupId: true,
                                    groupName: true
                                }
                            }
                        }
                    }
                },
                where: {
                    linkExId: linkDatas.linkExId,
                    linkParams: linkDatas.linkParams === null
                        ? { equals: Prisma.DbNull }
                        : { equals: linkDatas.linkParams },
                    linkRedirection: linkDatas.linkRedirection,
                    linkActif: true,
                    tokenHash: tokenHash

                },
            })
            if (groupInBd === null) {
                return null
            }
            const group: GroupMiniType = {
                groupId: groupInBd.exerciseAccess.group.groupId,
                groupName: groupInBd.exerciseAccess.group.groupName
            }
            return group
        }
        catch (error) {
            console.error("Erreur dans getGroupDataByExerciseToken :", error)
            throw error;
        }
    }

    static async getListGroupAndAssociationExId(exId: StringNameType, userId: EntierPositifType)
        : Promise<{
            userGroups: {
                group: {
                    exerciseAccesses: {
                        exerciselinks: {
                            linkExId: string;
                        }[];
                    }[];
                    groupId: number;
                    groupName: string;
                };
            }[];
        } | null> {
        try {
            const listGroupsAssociation = await prisma.user.findUnique({
                select: {
                    userGroups: {
                        select: {
                            group: {
                                select: {
                                    groupName: true,
                                    groupId: true,
                                    exerciseAccesses: {
                                        select: {
                                            exerciselinks: {
                                                select: {
                                                    linkExId: true,
                                                },
                                                where: {
                                                    linkExId: exId
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                where: {
                    userId: userId,
                }
            });
            return listGroupsAssociation
        }
        catch (error) {
            console.error("Erreur dans getListGroupAndAssociationExId :", error)
            throw error;
        }
    }

static async isGroupAssociatedWithLinkExercise(linkDatas: ExerciseLinkDatasType, groupId: EntierPositifType)
        : Promise<boolean> {

        const isInBd = await prisma.exerciselinks.findFirst({
            select: {
                linkExId: true,
            },
            where: {
                linkExId: linkDatas.linkExId,
                linkParams: linkDatas.linkParams === null
                    ? { equals: Prisma.DbNull }
                    : { equals: linkDatas.linkParams },
                linkRedirection: linkDatas.linkRedirection,
                exerciseAccess:{
                    groupId:groupId
                } 
            },
        })
        return isInBd ? true : false
    }

    static async isLinkInBdd(linkDatas: ExerciseLinkDatasType, tokenHash: string)
        : Promise<boolean> {

        const isInBd = await prisma.exerciselinks.findFirst({
            select: {
                linkExId: true,
            },
            where: {
                linkExId: linkDatas.linkExId,
                linkParams: linkDatas.linkParams === null
                    ? { equals: Prisma.DbNull }
                    : { equals: linkDatas.linkParams },
                linkRedirection: linkDatas.linkRedirection,
                tokenHash: tokenHash

            },
        })
        return isInBd ? true : false
    }

    static async isLoginValid(userId: EntierPositifType, userPsswd: PasswordShortType)
        : Promise<boolean> {
        
        try {
            const studentInBd = await prisma.userSimpleLogin.findUnique({
                select: {
                    userId: true,
                    passwordSimpleHash: true,
                },
                where: {
                    userId: userId
                },
            })
            if(studentInBd){
                return await bcrypt.compare(userPsswd, studentInBd.passwordSimpleHash)
            }
            return false
            
        } catch (error) {
            console.error("Erreur dans getListGroupAndAssociationExId :", error)
            throw error;
        }
    }


    static async getNbGroupAssociatedByUserIdExId(exId: StringNameType, userId: EntierPositifType)
        : Promise<number> {
        try {
            const associatedGroup = await prisma.exerciselinks.count({
                where: {
                    linkExId: exId,
                    exerciseAccess: {
                        userId: userId
                    }
                }
            });
            return associatedGroup
        }
        catch (error) {
            console.error("Erreur dans getNbGroupAssociatedByUserIdExId :", error)
            throw error;
        }
    }

    static async getOrCreateExerciseAccess(groupId: EntierPositifType, userId: EntierPositifType)
        : Promise<{ token: string, tokenHash: string }> {

        try {
            const tokenDatas = await this.getExistingExerciseAccess(groupId, userId);
            if (tokenDatas) {
                return tokenDatas;
            }
        } catch (error) {
            throw error;
        }
        try {
            const newTokenDatas = await this.createExerciseAccess(groupId, userId);
            return newTokenDatas;
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Détection du code P2002 (contrainte unique)
                if (error.code === 'P2002') {
                    console.error('Erreur : ce token existe déjà.');
                    console.error('Champs en conflit :', error.meta?.target);
                    try {
                        const tokenDatas = await ExerciseAccesModel.getExistingExerciseAccess(groupId, userId);
                        if (tokenDatas) {
                            return tokenDatas;
                        }
                    }
                    catch (error) {
                        throw error;
                    }
                }
            }

            console.error('Erreur lors de la récupération de l\'accès à l\'exercice :', error);
            throw error;
        }
    }



    static async updateGroupAndAssociationExId(
        userId: EntierPositifType,
        linkDatas: ExerciseLinkDatasType,
        additions: GroupsListForExerciseType,
        deletions: GroupsListForExerciseType
    ) {
        return prisma.$transaction(async (tx) => {
            // Traitement des ajouts et suppressions
            for (const element of additions) {

                //récup ou création du tokenhash
                const exerciseAccess = await tx.exerciseAccess.findUnique({
                    select: {
                        tokenHash: true,
                    },
                    where: {
                        groupId_userId: {
                            groupId: element.groupId,
                            userId: userId,
                        },
                    },
                })
                let tokenHash: string
                if (exerciseAccess === null) {
                    //il faut créer le token
                    const newOriginalToken = generateExerciseToken();
                    const newEncryptedToken = encryptExerciseToken(newOriginalToken);
                    const newHashedToken = hashExerciseToken(newOriginalToken);
                    await tx.exerciseAccess.create({
                        data: {
                            groupId: element.groupId,
                            userId: userId,
                            tokenEncrypted: newEncryptedToken,
                            tokenHash: newHashedToken,
                        },
                    });
                    tokenHash = newHashedToken
                }
                else {
                    tokenHash = exerciseAccess.tokenHash
                }

                //vérification que le lien n'existe pas déjà
                const isInBd = await tx.exerciselinks.findFirst({
                    select: {
                        linkExId: true,
                    },
                    where: {
                        linkExId: linkDatas.linkExId,
                        linkParams: linkDatas.linkParams === null
                            ? { equals: Prisma.DbNull }
                            : { equals: linkDatas.linkParams },
                        linkRedirection: linkDatas.linkRedirection,
                        tokenHash: tokenHash

                    },
                })
                //pas de lien
                //création du lien dans la base
                if (isInBd === null) {
                    await tx.exerciselinks.create({
                        data: {
                            linkExId: linkDatas.linkExId,
                            linkParams:
                                linkDatas.linkParams === null
                                    ? Prisma.DbNull
                                    : linkDatas.linkParams,
                            linkRedirection: linkDatas.linkRedirection,
                            linkActif: false,
                            tokenHash: tokenHash
                        },
                    });
                }

            }

            for (const element of deletions) {
                //on recupère le tokenhash du groupe
                const exerciseAccess = await tx.exerciseAccess.findUnique({
                    select: {
                        tokenHash: true,
                    },
                    where: {
                        groupId_userId: {
                            groupId: element.groupId,
                            userId: userId,
                        },
                    },
                })

                if (exerciseAccess !== null) {
                    const tokenHash = exerciseAccess.tokenHash
                    //on continue en cherchant si le lien existe et on récupère son id
                    const idInBd = await tx.exerciselinks.findFirst({
                        select: {
                            linkId: true,
                        },
                        where: {
                            linkExId: linkDatas.linkExId,
                            linkParams: linkDatas.linkParams === null
                                ? { equals: Prisma.DbNull }
                                : { equals: linkDatas.linkParams },
                            linkRedirection: linkDatas.linkRedirection,
                            tokenHash: tokenHash
                        },


                    })

                    //le lien existe
                    //suppression du lien dans la base
                    if (idInBd !== null) {
                        await tx.exerciselinks.delete({
                            where: {
                                linkId: idInBd.linkId,
                            },
                        });
                    }

                }

            }
        });
    }


}

export default ExerciseAccesModel;