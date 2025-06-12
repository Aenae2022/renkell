import { ClassroomRefSchema, ClassroomRefType } from '@shared/schema/classroom.schema';
import { prisma } from '../lib/prisma/client';

export default class GroupModel {
  
  static async doesGroupIdExist(groupId: number): Promise<boolean> {

    const group = await prisma.group.findUnique({
      where: { groupId: groupId },
      select: { groupId: true },
    });
    return !!group;
  }
  
  static async getClassroomRefByGroupId(groupId: number) {

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
        const parsed = ClassroomRefSchema.safeParse(group.classroom.classroomRef);
    
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
}