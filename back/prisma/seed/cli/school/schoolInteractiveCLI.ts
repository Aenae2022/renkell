//prisma/seed/interactiveCli.ts
import inquirer from 'inquirer'
import { createSchool } from '../../models/school/createSchool'

export async function runSchoolInteractiveCLI() {

    const { name } = await inquirer.prompt<{ name: string }>([
      {
        type: 'input',
        name: 'name',
        message: "Entrez le nom de l'école :",
        validate: (input) => input.trim() !== '' || 'Le nom ne peut pas être vide',
      },
    ])

    await createSchool(name)

  } 
