import { prisma } from '../../../../src/lib/prisma/client'


interface GroupParams {
  groupName : string;
  groupLanguage : string;
  groupPrincipal : boolean
}

export async function createGroup(params: GroupParams) {
  const groupData: any = {
    groupName: params.groupName,
    groupLanguage : params.groupLanguage,
    groupPrincipal: params.groupPrincipal,
  };

  const newGroup = await prisma.group.create({
    data: groupData,
  });

  console.log('Created classroom:', newGroup);
}
