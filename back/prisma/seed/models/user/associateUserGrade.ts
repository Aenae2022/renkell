import { prisma } from '../../../../src/lib/prisma/client'


interface UserGradeParams {
  userId: number;
  gradeId: number;
}

export async function createAssociationUsergrade(params: UserGradeParams) {
  const newAssociation = await prisma.user.update({
    where: { userId: params.userId },
    data: {
      grade: {
        connect: { gradeId : params.gradeId },
      }
    }
  });

  console.log('Created association user-grade :', newAssociation);
}
