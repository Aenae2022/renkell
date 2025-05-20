// prisma/seed/cli/school/schoolCLI.ts
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createSchool } from '../../models/school/createSchool';

export function runSchoolCLI() {
yargs(hideBin(process.argv))
  .command('create-school <name>', 'Create a new school', {}, (argv) => {
    createSchool(argv.name as string);
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .parse();

}