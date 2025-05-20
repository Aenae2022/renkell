//prisma/seed/classroom/classroomInteractiveCLI.ts
import inquirer from 'inquirer'
import { createGroup } from '../../models/group/createGroup'

interface GroupAnswers {
  groupName: string
  groupLanguage: string
  groupPrincipal: boolean
  
}

export async function runGroupInteractiveCLI() {

    const answers = await inquirer.prompt<GroupAnswers>([
      {
        type: 'input',
        name: 'groupName',
        message: 'Entrez le nom du group :',
        validate: (input) => input.trim() !== '' || 'ce champ ne peut pas être vide',
      },
      {
        type: 'input',
        name: 'groupLanguage',
        message: 'Entrez la langue du group (Fr ou Br):',
        validate: (input) => input.trim() !== '' || 'ce champ ne peut pas être vide',

      },
      {
        type: 'confirm',
        name: 'groupPrincipal',
        message: 'Ce group est-il un groupe classe ?',
        default: false,
      }  
    ])

    await createGroup({
      groupName: answers.groupName,
      groupLanguage: answers.groupLanguage,
      groupPrincipal: answers.groupPrincipal,
    })

  } 