import { prisma } from '../../../../src/lib/prisma/client'


interface ClassroomParams {
  classroomNumber: number;
  classroomRef:string;
  classroomBorderColor: string;
  classroomBackgroundColor: string;
  classroomColor: string;
  classroomOrder?: number; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  schoolId?: number; // Optionnel car c'est une clé étrangère optionnelle
}

export async function createClassroom(params: ClassroomParams) {
  const classroomData: any = {
    classroomNumber: params.classroomNumber,
    classroomRef: params.classroomRef,
    classroomBorderColor: params.classroomBorderColor,
    classroomBackgroundColor: params.classroomBackgroundColor,
    classroomColor: params.classroomColor,
  };

  // Ajouter classroomOrder seulement s'il est fourni, sinon utiliser la valeur par défaut de Prisma
  if (params.classroomOrder !== undefined) {
    classroomData.classroomOrder = params.classroomOrder;
  }

  // Ajouter schoolId seulement s'il est fourni
  if (params.schoolId !== undefined) {
    classroomData.schoolId = params.schoolId;
  }

  const newClassroom = await prisma.classroom.create({
    data: classroomData,
  });

  console.log('Created classroom:', newClassroom);
}
