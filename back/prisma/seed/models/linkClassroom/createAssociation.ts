import { prisma } from '../../../../src/lib/prisma/client'


interface LinkClassroomParams {
  classroomId: number;
  linkId: number;
}

export async function createAssociation(params: LinkClassroomParams) {
  const associationData: any = {
    classroomId: params.classroomId,
    linkId: params.linkId,
  };
  const newAssociation = await prisma.LinkClassroom.create({
    data: associationData,
  });

  console.log('Created association link classroom:', newAssociation);
}
