// prisma/seed/cli.ts
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createClassroom } from '../../models/classroom/createClassroom';

export function runClassroomCLI() {
yargs(hideBin(process.argv))
  .command('create-classroom', 'Create a new classroom', {
    classroomNumber: { type: 'number', demandOption: true },
    classroomName: { type: 'string', demandOption: true },
    classroomBorderColor: { type: 'string', demandOption: true },
    classroomBackgroundColor: { type: 'string', demandOption: true },
    classroomColor: { type: 'string', demandOption: true },
    classroomOrder: { type: 'number', default: 0 },
    schoolId: { type: 'number' },
  }, (argv) => {
    createClassroom({
      classroomNumber: argv.classroomNumber,
      classroomName: argv.classroomName,
      classroomBorderColor: argv.classroomBorderColor,
      classroomBackgroundColor: argv.classroomBackgroundColor,
      classroomColor: argv.classroomColor,
      classroomOrder: argv.classroomOrder,
      schoolId: argv.schoolId,
    });
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .parse();
}


