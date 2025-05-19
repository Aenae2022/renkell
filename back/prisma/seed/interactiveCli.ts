import inquirer from 'inquirer'
import { createSchool } from './createSchool'
import { createClassroom } from './createClassroom'
import { prisma } from '../../src/lib/prisma/client'

interface ClassroomAnswers {
  classroomNumber: string
  classroomBorderColor: string
  classroomBackgroundColor: string
  classroomColor: string
  classroomOrder: string
  schoolId: string
}

async function main() {
  const { action } = await inquirer.prompt<{ action: string }>([
    {
      type: 'list',
      name: 'action',
      message: 'Que souhaitez-vous faire ?',
      choices: ['Créer une école', 'Créer une salle de classe', 'Quitter'],
    },
  ])

  if (action === 'Créer une école') {
    const { name } = await inquirer.prompt<{ name: string }>([
      {
        type: 'input',
        name: 'name',
        message: "Entrez le nom de l'école :",
        validate: (input) => input.trim() !== '' || 'Le nom ne peut pas être vide',
      },
    ])

    await createSchool(name)

  } else if (action === 'Créer une salle de classe') {
    const answers = await inquirer.prompt<ClassroomAnswers>([
      {
        type: 'input',
        name: 'classroomNumber',
        message: 'Entrez le numéro de la salle de classe :',
        validate: (input) => !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide',
      },
      {
        type: 'input',
        name: 'classroomBorderColor',
        message: 'Entrez la couleur de bordure de la salle de classe :',
      },
      {
        type: 'input',
        name: 'classroomBackgroundColor',
        message: 'Entrez la couleur de fond de la salle de classe :',
      },
      {
        type: 'input',
        name: 'classroomColor',
        message: 'Entrez la couleur de la salle de classe :',
      },
      {
        type: 'input',
        name: 'classroomOrder',
        message: "Entrez l'ordre de la salle de classe :",
        default: '0',
        validate: (input) => !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide',
      },
      {
        type: 'input',
        name: 'schoolId',
        message: "Entrez l'ID de l'école (optionnel) :",
        validate: (input) => input === '' || !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide ou rien',
      },
    ])

    await createClassroom({
      classroomNumber: parseInt(answers.classroomNumber),
      classroomBorderColor: answers.classroomBorderColor,
      classroomBackgroundColor: answers.classroomBackgroundColor,
      classroomColor: answers.classroomColor,
      classroomOrder: parseInt(answers.classroomOrder),
      schoolId: answers.schoolId ? parseInt(answers.schoolId) : undefined,
    })

  } else if (action === 'Quitter') {
    console.log('Au revoir !')
    await prisma.$disconnect()
    process.exit(0)
  }

  await prisma.$disconnect()
}

main().catch(async (e) => {
  console.error('❌ Erreur inattendue :', e)
  await prisma.$disconnect()
  process.exit(1)
})

// Usage:
// npx tsx prisma/seed/interactiveCLI.ts
