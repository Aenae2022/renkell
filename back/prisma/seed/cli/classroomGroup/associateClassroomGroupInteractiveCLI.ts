//prisma/seed/cli/classroomLink/classroomLinkInteractiveCLI.ts
import inquirer from 'inquirer'
import { associateClassroomGroup } from '../../models/classroomGroup/associateClassroomGroup';

interface ClassroomGroupAnswers {
  classroomId: string;
  groupId: string;
}

export async function runAssociateClassroomGroupInteractiveCLI() {
 const answers = await inquirer.prompt<ClassroomGroupAnswers>([
      {
        type: 'input',
        name: 'classroomId',
        message: 'id de la salle de classe',
        validate: (input) => !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide',
      },
      {
        type: 'input',
        name: 'groupId',
        message: 'id du groupe classe',
        validate: (input) => !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide',
      },
    ])

    await associateClassroomGroup({
      classroomId: parseInt(answers.classroomId),
      groupId: parseInt(answers.groupId)
    })

  } 

