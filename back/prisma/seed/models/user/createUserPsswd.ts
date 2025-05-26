import { PasswordType } from '@shared/schema/fields/password.schema';
import { prisma } from '../../../../src/lib/prisma/client'
import bcrypt from 'bcrypt';

interface UserPsswdParams {
  userId: number;
  inputPsswd: PasswordType;
}

export async function createUserPsswd(params: UserPsswdParams) {
  
    //on encode le mot de passe
    const validPsswd  = await bcrypt.hash(params.inputPsswd, 10);
  const work = await prisma.user.update({
    where: { userId: params.userId },
    data: {
      userPsswd : validPsswd
 },
    });
    
 
  console.log('mot de passe enregistré :', work);
}
