import { prisma } from '../../../../src/lib/prisma/client'
import bcrypt from 'bcrypt';

interface UserParams {
  userFamilyName: string;
  userFirstName:string;
  userPseudo?: string;
  userPsswd?: string;
  userMail?: string; 
  userIcon?: string; 
}

export async function createUser(params: UserParams) {
    if ((params.userPseudo === null && params.userPsswd !== null) ||
       (params.userPseudo !== null && params.userPsswd === null)) {
      throw new Error('userPseudo and userPsswd must be both null or both non-null');
   }

  const user : any = {
         userFamilyName: params.userFamilyName,
         userFirstName: params.userFirstName,
      }
   

  if (params.userPseudo !== undefined) {
    user.userPseudo = params.userPseudo;
  }

  if (params.userPsswd !== undefined) {
    user.userPsswd = await bcrypt.hash(params.userPsswd, 10);
  }

  if (params.userMail !== undefined) {
    user.userMail = params.userMail;
  }

  if (params.userIcon !== undefined) {
    user.userIcon = params.userIcon;
  }
  const newUser = await prisma.user.create({
    data: user,
  });

  console.log('Created classroom:', newUser);
}
