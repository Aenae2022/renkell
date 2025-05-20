import inquirer from 'inquirer'
import { runSchoolInteractiveCLI } from './school/schoolInteractiveCLI'
import { runClassroomInteractiveCLI } from './classroom/classroomInteractiveCLI'
import { runLinkInteractiveCLI } from './link/linkInteractiveCLI'
import { runLinkClassroomInteractiveCLI } from './linkClassroom/linkClassroomInteractiveCLI'

async function main() {
  const { section } = await inquirer.prompt([
    {
      type: 'list',
      name: 'section',
      message: 'Quel module souhaitez-vous gérer ?',
      choices: ['École', 'Salle de classe', 'Lien','Association classroom link', 'Quitter'],
    },
  ])

  if (section === 'École')  runSchoolInteractiveCLI()
  else if (section === 'Salle de classe')  runClassroomInteractiveCLI()
  else if (section === 'Lien')  runLinkInteractiveCLI()
  else if (section === 'Association classroom link')  runLinkClassroomInteractiveCLI()

  else process.exit(0)
}

main()
