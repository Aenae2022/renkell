import { ClassroomRefSchema, ClassroomRefType } from '@shared/schema/classroom.schema';
import { prisma } from '../lib/prisma/client';
import { EntierPositifType } from '@shared/schema/fields/entierPositif.schema';
import { GroupLinksType, GroupMiniSchema } from '@shared/schema/group.schema';
import { UserMiniListSchema } from '@shared/schema/user.schema';
import { ExerciseLinkDatasType } from '@shared/schema/link.schema';
import { group } from 'console';

export default class GroupModel {

  static async doesGroupIdExist(groupId: EntierPositifType): Promise<boolean> {

    const group = await prisma.group.findUnique({
      where: { groupId: groupId },
      select: { groupId: true },
    });
    return !!group;
  }

  static async doesGroupExistInClassroom(groupId: EntierPositifType, classroomId: EntierPositifType): Promise<boolean> {

    const group = await prisma.classroomGroup.findUnique({
      where: {
        classroomId_groupId: {
          classroomId: classroomId,
          groupId: groupId
        }
      },
      select: {
        groupId: true
      }
    });
    return !!group;
  }

  static async doesAssociationUserGroupExist(userId: EntierPositifType, groupId: EntierPositifType): Promise<boolean> {
    const association = await prisma.groupUser.findUnique({
      where: { userId_groupId: { userId, groupId } },
      select: { userId: true },
    });
    return !!association;
  }

  static async getClassroomRefByGroupId(groupId: EntierPositifType) {

    try {
      const group = await prisma.group.findUnique({
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
      const parsed = ClassroomRefSchema.safeParse(group?.classroom?.classroomRef);

      if (!parsed.success) {
        console.error("Validation Zod échouée :", parsed.error.errors);
        throw new Error("Données utilisateur invalides");
      }

      return {
        message: "User récupéré avec succès",
        reponse: true,
        result: parsed.data,
      };
    } catch (error) {
      console.error("Erreur Prisma :", error);
      throw error;
    }
  }

  static async getGroupDatasById(groupId: EntierPositifType) {

    try {
      const group = await prisma.group.findUnique({
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
    } catch (error) {
      console.error("Erreur Prisma :", error);
      throw error;
    }
  }

  static async getGroupWithLinks(groupId: EntierPositifType):
    Promise<GroupLinksType | null> {

    try {
      const groupWithLinks = await prisma.group.findUnique({
        where: {
          groupId: groupId,
        },
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
              linkId: "desc",
            },
          }
        },
      });
      return groupWithLinks
    } catch (error) {
      throw error;
    }

  }

  static async getGroupPrincipalBySchoolId(schoolId: EntierPositifType) {

    try {
      const groups = await prisma.group.findMany({
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
      })
      return groups
    } catch (error) {
      console.error("Erreur Prisma :", error);
      throw error;
    }
  }

  static async getStudentsListByGroupId(groupId: number) {

    try {
      const usersDatas = await prisma.user.findMany({
        where: { userRoles: { some: { roleId: 1 } }, userGroups: { some: { groupId: groupId } } },
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

      if (usersDatas.length === 0) {
        return {
          message: "Il n'y a pas d'élèves dans ce groupe",
          reponse: null,
          result: [],
        };
      }

      //Reconstruire la liste des élèves avec le format attendu par le front:
      const usersList = usersDatas.map((g: { userId: number, userFamilyName: string, userFirstName: string }) => ({
        userId: g.userId,
        userName: g.userFirstName + " " + g.userFamilyName,
      }));


      //on valide les données avec Zod
      const parsed = UserMiniListSchema.safeParse(usersList);

      if (!parsed.success) {
        console.error("Validation Zod échouée :", parsed.error.errors);
        throw new Error("Données invalides");
      }

      return {
        message: "Liste des élèves du groupe récupérée avec succès",
        reponse: true,
        result: parsed.data,
      };

    } catch (error) {
      console.error("Erreur Prisma :", error);
      throw error;
    }
  }

}