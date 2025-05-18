// prisma/seed/createSchool.ts (ou un autre nom)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const schoolName = args[0];

  if (!schoolName) {
    console.error("❌ Merci de fournir un nom d'école.");
    process.exit(1);
  }

  const school = await prisma.school.create({
    data: {
      schoolName
    }
  });

  console.log("✅ École créée :", school);
}

main()
  .catch(e => {
    console.error("❌ Erreur :", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
// Pour exécuter ce script, utilisez la commande suivante dans le terminal :
// npm run create:school "nom de l'école"