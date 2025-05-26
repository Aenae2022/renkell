//prisma/seed/cli/classroomLink/classroomLinkInteractiveCLI.ts
import inquirer from 'inquirer'
import { createAssociationUserLink } from '../../models/user/associateUserLink';

interface LinksUserAnswers {
  userId: string;
  linkId: string;
}

export async function runAssociateUserLinkICLI() {
 const answers = await inquirer.prompt<LinksUserAnswers>([
      {
        type: 'input',
        name: 'userId',
        message: 'id du user',
        validate: (input) => !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide',
      },
      {
        type: 'input',
        name: 'linkId',
        message: 'id du lien',
        validate: (input) => !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide',
      },
    ])

    await createAssociationUserLink({
      userId: parseInt(answers.userId),
      linkId: parseInt(answers.linkId)
    })

  } 

