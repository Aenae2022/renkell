import { prisma } from '../lib/prisma/client';

class ClassroomModel {
  static async doesClassroomRefExist(classroomRef: string): Promise<boolean> {
    const classroom = await prisma.classroom.findUnique({
      where: { classroomRef: classroomRef },
      select: { classroomRef: true },
    });
    return !!classroom;
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
    if(classroomWithLinks.group?.groupLinks.length === 0) {
         return {
        message: "Pas de liens trouvés pour cette salle de classe",
        reponse: false,
        result: [],
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

  

}

export default ClassroomModel;
