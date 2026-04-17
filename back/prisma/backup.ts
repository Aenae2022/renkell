import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const backup: Record<string, any> = {};

  // Récupère tous les modèles Prisma disponibles
  const models = Object.keys(prisma).filter(
    (key) =>
      typeof (prisma as any)[key]?.findMany === "function"
  );

  for (const modelName of models) {
    const model = (prisma as any)[modelName];

    if (!model?.findMany) continue;

    try {
      const data = await model.findMany();

      // 🔥 ignore les tables vides
      if (data && data.length > 0) {
        backup[modelName] = data;
        console.log(`✔ ${modelName}: ${data.length} rows`);
      } else {
        console.log(`⏭ ${modelName}: empty`);
      }

    } catch (error: any) {
      // 🔥 ignore les tables inexistantes (ton erreur P2021)
      if (error.code === "P2021") {
        console.log(`⚠ ${modelName}: table inexistante → skip`);
      } else {
        console.log(`❌ ${modelName}: erreur inconnue`, error.message);
      }
    }
  }

  fs.writeFileSync("backup.json", JSON.stringify(backup, null, 2));

  console.log("✅ Backup terminé");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());