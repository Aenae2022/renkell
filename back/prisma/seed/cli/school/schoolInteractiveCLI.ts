//prisma/seed/interactiveCli.ts
import inquirer from 'inquirer'
import { createSchool } from '../../models/school/createSchool'

interface SchoolAnswers {
  schoolName: string
  schoolRef: string
}
export async function runSchoolInteractiveCLI() {

    const  answers  = await inquirer.prompt<SchoolAnswers>([
      {
        type: 'input',
        name: 'schoolName',
        message: "Entrez le nom de l'école :",
        validate: (input) => input.trim() !== '' || 'Le nom ne peut pas être vide',
      },
      {
        type: 'input',
        name: 'schoolRef',
        message: "Entrez la référence de l\'école pour la barre d\'adresse :",
        validate: (input) => input.trim() !== '' || 'Le nom ne peut pas être vide',
      },
    ])

    await createSchool({
      schoolName: answers.schoolName,
      schoolRef: answers.schoolRef,
    })

  } 
