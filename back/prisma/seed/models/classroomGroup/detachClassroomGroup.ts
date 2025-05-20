import { prisma } from '../../../../src/lib/prisma/client'

export async function detachClassroomGroup(classroomId: number) {
  const updatedClassroom = await prisma.classroom.update({
    where: { classroomId },
    data: {
      group: {
        disconnect: true
      }
    },
  });

  console.log('Classroom detached from group:', updatedClassroom);
}
