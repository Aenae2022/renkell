//prisma/seed/cli/classroomLink/classroomLinkInteractiveCLI.ts
import inquirer from 'inquirer'
import { createAssociation } from '../../models/groupLink/createAssociation';

interface GroupLinkAnswers {
  groupId: string;
  linkId: string;
}

export async function runGroupLinkInteractiveCLI() {
 const answers = await inquirer.prompt<GroupLinkAnswers>([
      {
        type: 'input',
        name: 'groupId',
        message: 'id du groupe',
        validate: (input) => !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide',
      },
      {
        type: 'input',
        name: 'linkId',
        message: 'id du lien',
        validate: (input) => !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide',
      },
    ])

    await createAssociation({
      groupId: parseInt(answers.groupId),
      linkId: parseInt(answers.linkId)
    })

  } 

