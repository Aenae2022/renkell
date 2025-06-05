import inquirer from 'inquirer'
import { createUser } from '../../models/user/createUser'
import { prisma } from '../../../../src/lib/prisma/client'


interface UserAnswers {
  userFamilyName: string;
  userFirstName:string;
  userPsswd: string;
  userMail: string; 
  userIcon: string; 
}

async function generateUniquePseudo(firstName: string, familyName: string): Promise<string> {
  const basePseudo = `${firstName.toLowerCase()}${familyName.toLowerCase()}`.replace(/\s+/g, '');
  let pseudo = basePseudo;
  let suffix = 1;

  while (true) {
    const existingUser = await prisma.user.findUnique({
      where: { userPseudo: pseudo },
    });

    if (!existingUser) {
      return pseudo;
    }

    pseudo = `${basePseudo}${suffix}`;
    suffix++;
  }
}


export async function runCreateUserICLI() {

    const answers = await inquirer.prompt<UserAnswers>([
      {
        type: 'input',
        name: 'userFamilyName',
        message: 'Entrez le nom de famille de l\'utilisateur :',
        validate: (input) => input.trim() !== '' || 'ce champ ne peut pas être vide',
      },
      {
        type: 'input',
        name: 'userFirstName',
        message: 'Entrez le prénom de l\'utilisateur :',
        validate: (input) => input.trim() !== '' || 'ce champ ne peut pas être vide',

      },
      {
        type: 'input',  
        name: 'userPsswd',
        message: 'Entrez le mot de passe (optionnel) :',
      },
      {
        type: 'input',
        name: 'userIcon',
        message: "Entrez l'icone (optionnel) :",
      }
    ])

    const userPseudo = await generateUniquePseudo(answers.userFirstName, answers.userFamilyName);

    await createUser({
      userFamilyName: answers.userFamilyName,
      userFirstName: answers.userFirstName,
      userPseudo: userPseudo,
      userPsswd: answers.userPsswd ? answers.userPsswd : undefined,
        userMail: answers.userMail ? answers.userMail : undefined,
        userIcon: answers.userIcon ? answers.userIcon : undefined,
    })

  } 