import { prisma } from '../../../../src/lib/prisma/client'


interface UserGroupsParams {
  userId: number;
  groupId: number;
  principal?: boolean;
}

export async function createAssociationUserGroup(params: UserGroupsParams) {
  const associationData: any = {
    userId: params.userId,
    groupId: params.groupId,
  };

  // Ajouter classroomOrder seulement s'il est fourni, sinon utiliser la valeur par défaut de Prisma
  if (params.principal !== undefined) {
    associationData.principal = params.principal;
  }
  const newAssociation = await prisma.groupUser.create({
    data: associationData,
  });

  console.log('Created association user-group :', newAssociation);
}
