import { ClassroomRefSchema, ClassroomRefType } from '@shared/schema/classroom.schema';
import { prisma } from '../lib/prisma/client';
import { EntierPositifType } from '@shared/schema/fields/entierPositif.schema';
import { GroupMiniSchema } from '@shared/schema/group.schema';

export default class GroupModel {
  
  static async doesGroupIdExist(groupId: EntierPositifType): Promise<boolean> {

    const group = await prisma.group.findUnique({
      where: { groupId: groupId },
      select: { groupId: true },
    });
    return !!group;
  }
  
  static async getClassroomRefByGroupId(groupId: EntierPositifType) {

    try{
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

    try{
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
}