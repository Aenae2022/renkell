import { prisma } from '../lib/prisma/client';

class GradeModel {
  static async doesGradeIdExist(gradeId: number): Promise<boolean> {

    const grade = await prisma.grade.findUnique({
      where: { gradeId: gradeId },
      select: { gradeId: true },
    });
    return !!grade;
  }
}


export default GradeModel;