import { prisma } from '../../../../src/lib/prisma/client'

interface ClassroomGroupParams {
  classroomId: number;
  groupId: number;
}

export async function associateClassroomGroup(params: ClassroomGroupParams) {
  const updatedClassroom = await prisma.classroom.update({
    where: { classroomId : params.classroomId },
    data: {
      group: {
        connect: { groupId : params.groupId },
      }
    },
  });

  console.log('Classroom updated with group:', updatedClassroom);
}
