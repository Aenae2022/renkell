//prisma/seed/interactiveCli.ts
import inquirer from 'inquirer'
import { createSchool } from './models/school/createSchool'
import { createClassroom } from './models/classroom/createClassroom'
import { createLink } from './models/link/createLink'
import { prisma } from '../../src/lib/prisma/client'

interface ClassroomAnswers {
  classroomNumber: string
  classroomBorderColor: string
  classroomBackgroundColor: string
  classroomColor: string
  classroomOrder: string
  schoolId: string
}
interface LinkAnswers {
  linkName :string;           
  linkTitleFr:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkTitleBr:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkFullNameFr:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkFullNameBr:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkRedirection:string;
  linkIcon:string;
  linkMatter:string;
  linkDescriptionFr:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkDescriptionBr:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkType:string;
}

async function main() {
  const { action } = await inquirer.prompt<{ action: string }>([
    {
      type: 'list',
      name: 'action',
      message: 'Que souhaitez-vous faire ?',
      choices: ['Créer une école', 'Créer une salle de classe', 'Créer un lien', 'Quitter'],
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

  } else if (action === 'Créer un lien') {
    const answers = await inquirer.prompt<LinkAnswers>([
      {
        type: 'input',
        name: 'linkName',
        message: 'nom du lien CamelCase',
      },
      {
        type: 'input',
        name: 'linkTitleFr',
        message: "titre en français (optionnel) :",
        default: "",
      },
      {
        type: 'input',
        name: 'linkTitleBr',
        message: "titre en breton (optionnel) :",
        default: "",
      },
      {
        type: 'input',
        name: 'linkFullNameFr',
        message: "nom complet en français (optionnel) :",
        default: "",
      },
      {
        type: 'input',
        name: 'linkFullNameBr',
        message: "nom complet en breton (optionnel) :",
        default: "",
      },
      {
        type: 'input',
        name: 'linkRedirection',
        message: 'Entrez le lien de redirection :',
      },
      {
        type: 'input',
        name: 'linkIcon',
        message: 'Entrez l\'icône du lien :',
      },
      {
        type: 'input',
        name: 'linkMatter',
        message: 'Entrez la matière du lien : (multidomaine, mathématiques, francais, autre)',
      },
      {
        type: 'input',
        name: 'linkDescriptionFr',
        message: "description en français (optionnel) :",
        default: "",
      },
      {
        type: 'input',
        name: 'linkDescriptionBr',
        message: "description en breton (optionnel) :",
        default: "",
      },
      {
        type: 'input',
        name: 'linkType',
        message: 'Entrez le type de lien : (all, teacher, student)',
      },
    ])

    await createLink({
      linkName: answers.linkName,
      linkTitleFr: answers.linkTitleFr,
      linkTitleBr: answers.linkTitleFr,
      linkFullNameFr: answers.linkFullNameFr,
      linkFullNameBr: answers.linkFullNameBr,
      linkRedirection: answers.linkRedirection,
        linkIcon: answers.linkIcon,
        linkMatter: answers.linkMatter,
        linkDescriptionFr: answers.linkDescriptionFr,
        linkDescriptionBr: answers.linkDescriptionBr,
        linkType: answers.linkType,
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
