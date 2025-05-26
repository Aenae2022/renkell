import inquirer from 'inquirer'
import { runCreateUserICLI } from './createUserICLI'
import { runAssociateUserLinkICLI } from './associateUserLinkICLI'
import { runAssociateUserGroupICLI } from './associateUserGroupICLI'
import { runCreateUserPsswdICLI } from './createUserPsswdICLI'


export async function runUserGlobalICLI() {
  const { section } = await inquirer.prompt([
    {
      type: 'list',
      name: 'section',
      message: 'Quelle action souhaitez vous faire?',
      choices: ['Créer un user','Associer un group à un user','Associer un lien à un user', 'Créer un mot de passe pour un utilisateur', 'Quitter'],
    },
  ])

  if (section === 'Créer un user') await runCreateUserICLI()
  else if (section === 'Associer un group à un user') await runAssociateUserGroupICLI()
  else if (section === 'Associer un lien à un user') await runAssociateUserLinkICLI()
  else if (section === 'Créer un mot de passe pour un utilisateur') await runCreateUserPsswdICLI()
  else if (section === 'Quitter')  process.exit(0)
 


}


