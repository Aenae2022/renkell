import { EntierPositifType } from '@shared/schema/fields/entierPositif.schema';
import { prisma } from '../lib/prisma/client';
import { decryptExerciseToken, encryptExerciseToken, generateExerciseToken, hashExerciseToken } from '../../utils/exerciseAcces';
import { StringDecoder } from 'string_decoder';
import { Prisma } from '@prisma/client';
import { ExerciseLinkDatasType } from '@shared/schema/link.schema';

class ExerciseAccesModel {
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
}

export default ExerciseAccesModel;