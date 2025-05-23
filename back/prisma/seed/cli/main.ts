import inquirer from 'inquirer'
import { runSchoolInteractiveCLI } from './school/schoolInteractiveCLI'
import { runClassroomInteractiveCLI } from './classroom/classroomInteractiveCLI'
import { runLinkInteractiveCLI } from './link/linkInteractiveCLI'
import { runGroupInteractiveCLI } from './group/groupInteractiveCLI'
import { runGroupLinkInteractiveCLI } from './groupLink/groupLinkInteractiveCLI'
import { runAssociateClassroomGroupInteractiveCLI } from './classroomGroup/associateClassroomGroupInteractiveCLI'

async function main() {
  const { section } = await inquirer.prompt([
    {
      type: 'list',
      name: 'section',
      message: 'Quel module souhaitez-vous gérer ?',
      choices: ['École', 'Salle de classe', 'Lien','Groupe','Association lien groupe','Association classroom group', 'Quitter'],
    },
  ])

  if (section === 'École')  runSchoolInteractiveCLI()
  else if (section === 'Salle de classe')  runClassroomInteractiveCLI()
  else if (section === 'Lien')  runLinkInteractiveCLI()
  else if (section === 'Groupe')  runGroupInteractiveCLI()
  else if (section === 'Association lien groupe')  runGroupLinkInteractiveCLI()
  else if (section === 'Association classroom group')  runAssociateClassroomGroupInteractiveCLI()
  else process.exit(0)
}

main()
