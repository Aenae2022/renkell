//prisma/seed/cli/linkClassroom/linkClassroomInteractiveCLI.ts
import inquirer from 'inquirer'
import { createAssociation } from '../../models/linkClassroom/createAssociation';

interface LinkClassroomAnswers {
  classroomId: string;
  linkId: string;
}

export async function runLinkClassroomInteractiveCLI() {
 const answers = await inquirer.prompt<LinkClassroomAnswers>([
      {
        type: 'input',
        name: 'classroomId',
        message: 'id de la classroom',
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
      classroomId: parseInt(answers.classroomId),
      linkId: parseInt(answers.linkId)
    })

  } 

