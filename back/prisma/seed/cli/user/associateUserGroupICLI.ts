//prisma/seed/cli/classroomLink/classroomLinkInteractiveCLI.ts
import inquirer from 'inquirer'
import { createAssociationUserGroup } from '../../models/user/associateUserGroup';

interface UserGroupsAnswers {
  userId: string;
  groupId: string;
  principal?: boolean;
}

export async function runAssociateUserGroupICLI() {
 const answers = await inquirer.prompt<UserGroupsAnswers>([
      {
        type: 'input',
        name: 'userId',
        message: 'id du user',
        validate: (input) => !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide',
      },
      {
        type: 'input',
        name: 'groupId',
        message: 'id du group',
        validate: (input) => !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide',
      },
      {
    type: 'confirm',
    name: 'principal',
    message: 'Ce groupe est-il principal ? (optionnel)',
  },
    ])

    await createAssociationUserGroup({
      userId: parseInt(answers.userId),
      groupId: parseInt(answers.groupId),
      principal: answers.principal !== undefined ? answers.principal : false
    })

  } 

