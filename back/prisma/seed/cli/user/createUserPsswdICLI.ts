//prisma/seed/cli/classroomLink/classroomLinkInteractiveCLI.ts
import inquirer from 'inquirer'
import { createUserPsswd } from '../../models/user/createUserPsswd';
import { PasswordSchema } from '@shared/schema/fields/password.schema';

interface UserPsswdAnswers {
  userId: string;
  inputPsswd: string;
}

export async function runCreateUserPsswdICLI() {
    try {
 const answers = await inquirer.prompt<UserPsswdAnswers>([
      {
        type: 'input',
        name: 'userId',
        message: 'id du user',
        validate: (input) => !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide',
      },
      {
        type: 'input',
        name: 'inputPsswd',
        message: 'mot de passe du user (8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)',
        validate: (input) => {
            const passwordVerification = PasswordSchema.safeParse(input);
            if (!passwordVerification.success) {
                return `Mot de passe invalide : ${passwordVerification.error.errors.map(e => e.message).join(', ')}`;
            }
            return true;
        },
    }
    ])

    await createUserPsswd({
      userId: parseInt(answers.userId),
      inputPsswd: answers.inputPsswd,
    })
console.log(`✅ Mot de passe défini avec succès pour l'utilisateur ${answers.userId}`);
  } catch (err) {
    console.error('❌ Erreur lors de la création du mot de passe :', err);
  }
  } 

