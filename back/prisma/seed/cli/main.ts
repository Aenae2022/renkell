import inquirer from 'inquirer'
import { runSchoolInteractiveCLI } from './school/schoolInteractiveCLI'
import { runClassroomInteractiveCLI } from './classroom/classroomInteractiveCLI'
import { runLinkInteractiveCLI } from './link/linkInteractiveCLI'
import { runGroupInteractiveCLI } from './group/groupInteractiveCLI'
import { runGroupLinkInteractiveCLI } from './groupLink/groupLinkInteractiveCLI'
import { runAssociateClassroomGroupInteractiveCLI } from './classroomGroup/associateClassroomGroupInteractiveCLI'
import { runUserGlobalICLI } from './user/userGlobalICLI'

async function main() {
  const { section } = await inquirer.prompt([
    {
      type: 'list',
      name: 'section',
      message: 'Quel module souhaitez-vous gérer ?',
      choices: ['École', 'Salle de classe', 'Lien','Groupe','Association lien groupe','Association classroom group','User', 'Quitter'],
    },
  ])

  if (section === 'École') await runSchoolInteractiveCLI()
  else if (section === 'Salle de classe') await runClassroomInteractiveCLI()
  else if (section === 'Lien') await runLinkInteractiveCLI()
  else if (section === 'Groupe') await runGroupInteractiveCLI()
  else if (section === 'Association lien groupe') await runGroupLinkInteractiveCLI()
  else if (section === 'Association classroom group') await runAssociateClassroomGroupInteractiveCLI()
  else if (section === 'User') await runUserGlobalICLI()

  else process.exit(0)
}

async function startCLI() {
  while (true) {
    await main();
  }
}

startCLI();