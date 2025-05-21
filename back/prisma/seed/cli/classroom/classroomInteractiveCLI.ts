//prisma/seed/classroom/classroomInteractiveCLI.ts
import inquirer from 'inquirer'
import { createClassroom } from '../../models/classroom/createClassroom'

interface ClassroomAnswers {
  classroomNumber: string
  classroomRef: string
  classroomBorderColor: string
  classroomBackgroundColor: string
  classroomColor: string
  classroomOrder: string
  schoolId: string
}

export async function runClassroomInteractiveCLI() {

    const answers = await inquirer.prompt<ClassroomAnswers>([
      {
        type: 'input',
        name: 'classroomNumber',
        message: 'Entrez le numéro de la salle de classe :',
        validate: (input) => !isNaN(parseInt(input)) || 'Veuillez entrer un nombre valide',
      },
      {
        type: 'input',
        name: 'classroomRef',
        message: 'Entrez la référence de la salle de classe pour la barre d\'adresse :',
        validate: (input) => input.trim() !== '' || 'ce champ ne peut pas être vide',

      },{
        type: 'input',
        name: 'classroomBorderColor',
        message: 'Entrez la couleur de bordure de la salle de classe :',
        validate: (input) => input.trim() !== '' || 'ce champ ne peut pas être vide',

      },
      {
        type: 'input',
        name: 'classroomBackgroundColor',
        message: 'Entrez la couleur de fond de la salle de classe :',
        validate: (input) => input.trim() !== '' || 'ce champ ne peut pas être vide',
},
      {
        type: 'input',
        name: 'classroomColor',
        message: 'Entrez la couleur de la salle de classe :',
        validate: (input) => input.trim() !== '' || 'ce champ ne peut pas être vide',
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
      classroomRef: answers.classroomRef,
      classroomBorderColor: answers.classroomBorderColor,
      classroomBackgroundColor: answers.classroomBackgroundColor,
      classroomColor: answers.classroomColor,
      classroomOrder: parseInt(answers.classroomOrder),
      schoolId: answers.schoolId ? parseInt(answers.schoolId) : undefined,
    })

  } 