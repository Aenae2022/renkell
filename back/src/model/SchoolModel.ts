import { prisma } from '../lib/prisma/client';

class SchoolModel {
  static async doesSchoolRefExist(schoolRef: string): Promise<boolean> {
    const school = await prisma.school.findUnique({
      where: { schoolRef: schoolRef },
      select: { schoolRef: true },
    });
    return !!school;
  }

  static async createSchool(schoolName: string, schoolRef: string) {
    return prisma.school.create({
      data: { schoolName, schoolRef }
    });
  }


  static async getClassroomsListByRef(schoolRef: string) {
    try {
      const schoolWithClasses = await prisma.school.findUnique({
        where: {
            schoolRef: schoolRef,
        },
        select: {
            schoolName: true,
            schoolRef: true,
            classrooms: {
              select: {
                classroomId: true,
                classroomNumber: true,
                classroomOrder: true,
                classroomBorderColor: true,
                classroomBackgroundColor: true,
                classroomColor: true,
                classroomRef: true,
                group: {
                  select: {
                    groupName: true,
                  },
                },
              },
              orderBy: {
                classroomOrder: "asc",
              },
            },
        },
      });

    if (!schoolWithClasses) {
      return {
        message: "École introuvable",
        reponse: null,
        result: [],
      };
    }
    if(schoolWithClasses.classrooms.length === 0) {
         return {
        message: "Pas de classes trouvées pour cette école",
        reponse: false,
        result: [],
      };
    }
    return {
      message: "Liste des classes récupérée avec succès",
      reponse: true,
      result: schoolWithClasses,
    };
  } catch (error) {
    console.error("Erreur Prisma :", error);
    throw error;
  }
}

}

export default SchoolModel;
