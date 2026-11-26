import { EntierPositifType } from '@shared/schema/fields/entierPositif.schema';
import { prisma } from '../lib/prisma/client';
import { ClassroomShortType } from '@shared/schema/classroom.schema';

class ClassroomModel {
  static async doesClassroomIdExist(classroomId: EntierPositifType): Promise<boolean> {

    const classroom = await prisma.classroom.findUnique({
      where: { classroomId: classroomId },
      select: { classroomRef: true },
    });
    return !!classroom;
  }

  static async doesClassroomRefExist(classroomRef: string): Promise<boolean> {

    const classroom = await prisma.classroom.findUnique({
      where: { classroomRef: classroomRef },
      select: { classroomRef: true },
    });
    return !!classroom;
  }

  static async doesClassroomRefExistInSchool(classroomRef: string, schoolId: number | null): Promise<boolean> {
    const classroom = await prisma.classroom.findFirst({
      where: {
        classroomRef: classroomRef,
        schoolId: schoolId,
      },
      select: { classroomRef: true },
    });
    return !!classroom;
  }


  static async getClassroomByRef(classroomRef: string): Promise<ClassroomShortType | null> {

    const classroom = await prisma.classroom.findUnique({
      where: { classroomRef: classroomRef },
      select: {
        classroomId: true,
        classroomNumber: true,
        classroomBackgroundColor: true,
        classroomColor: true,
        classroomBorderColor: true
      },
    });

    if(!classroom){
      return null
    }
    return classroom;
  }

  static async getClassroomLinksListByRef(classroomRef: string) {
    try {
      const classroomWithLinks = await prisma.classroom.findUnique({
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
                  link: { // ✅ on accède aux données du lien à travers `link`
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
    } catch (error) {
      console.error("Erreur Prisma :", error);
      throw error;
    }
  }

  static async getGroupsASsociatedToClassroom(classroomRef: string) {
    try {
      const groupsFound = await prisma.classroomGroup.findMany({
        select: {
          group: {
            select:
            {
              groupId: true,
              groupName: true
            }
          }
        },
        where: {
          classroom: {
            classroomRef: classroomRef
          }

        }
      })

      return groupsFound.map((gr) => {
        const group = {
          groupId: gr.group.groupId,
          groupName: gr.group.groupName
        }
        return group
      }
      )

    } catch (error) {
      console.error("Erreur Prisma :", error);
      throw error;
    }
  }
}





export default ClassroomModel;
