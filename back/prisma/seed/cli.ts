// prisma/seed/cli.ts
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createSchool } from './createSchool';
import { createClassroom } from './createClassroom';

yargs(hideBin(process.argv))
  .command('create-school <name>', 'Create a new school', {}, (argv) => {
    createSchool(argv.name as string);
  })
  .command('create-classroom', 'Create a new classroom', {
    classroomNumber: { type: 'number', demandOption: true },
    classroomBorderColor: { type: 'string', demandOption: true },
    classroomBackgroundColor: { type: 'string', demandOption: true },
    classroomColor: { type: 'string', demandOption: true },
    classroomOrder: { type: 'number', default: 0 },
    schoolId: { type: 'number' },
  }, (argv) => {
    createClassroom({
      classroomNumber: argv.classroomNumber,
      classroomBorderColor: argv.classroomBorderColor,
      classroomBackgroundColor: argv.classroomBackgroundColor,
      classroomColor: argv.classroomColor,
      classroomOrder: argv.classroomOrder,
      schoolId: argv.schoolId,
    });
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .parse();


  // Usage:
//   npx ts-node prisma/seed/cli.ts create-school "Nom École"
// npx ts-node prisma/seed/cli.ts create-classroom --classroomNumber=101 --classroomBorderColor=#000 --classroomBackgroundColor=#fff --classroomColor=#111 --schoolId=1
