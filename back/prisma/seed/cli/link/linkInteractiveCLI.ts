//prisma/seed/cli/link/interactiveCli.ts
import inquirer from 'inquirer'
import { createLink } from '../../models/link/createLink'


interface LinkAnswers {
  linkName :string;           
  linkTitleFr?:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkTitleBr?:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkFullNameFr?:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkFullNameBr?:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkRedirection:string;
  linkIcon:string;
  linkMatter:string;
  linkDescriptionFr?:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkDescriptionBr?:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkType:string;
}

export async function runLinkInteractiveCLI() {
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
      },
      {
        type: 'input',
        name: 'linkTitleBr',
        message: "titre en breton (optionnel) :",
      },
      {
        type: 'input',
        name: 'linkFullNameFr',
        message: "nom complet en français (optionnel) :",
      },
      {
        type: 'input',
        name: 'linkFullNameBr',
        message: "nom complet en breton (optionnel) :",
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
        message: 'Entrez la matière du lien : (multidomaine, mathematiques, francais, autre)',
      },
      {
        type: 'input',
        name: 'linkDescriptionFr',
        message: "description en français (optionnel) :",
      },
      {
        type: 'input',
        name: 'linkDescriptionBr',
        message: "description en breton (optionnel) :",
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

  } 

