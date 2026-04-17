import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync("backup.json", "utf-8"));

  console.log("🚀 Début restore...");

  // =========================
  // 1. TABLES SIMPLES (7)
  // =========================

  await restore("grade");
  await restore("domaine");
  await restore("sousDomaine");
  await restore("role");
  await restore("link");
  await restore("book");
  await restore("eventlibrarytype");

  // =========================
  // 2. TABLES AVEC FK (8)
  // =========================

  await restore("school");
  await restore("group");
  await restore("classroom");
  await restore("user");
  await restore("article");
  await restore("periodlibrary");
  await restore("bookGroup");
  await restore("bookEvent");

  // =========================
  // 3. TABLES PIVOT (IMPORTANT) (7)
  // =========================

  await restore("articleGrade");
  await restore("articlelink");
  await restore("roleUser");
  await restore("groupUser");
  await restore("groupLink");
  await restore("linkUser");
  await restore("lienPermission");

  console.log("✅ RESTORE TERMINÉ");

  async function restore(tableName: string) {
    const records = data[tableName];

    if (!records || records.length === 0) {
      console.log(`⏭ ${tableName}: empty`);
      return;
    }

    const model = (prisma as any)[tableName];

    if (!model?.create) {
      console.log(`⚠ ${tableName}: pas de model`);
      return;
    }

    for (const record of records) {
      try {
        await model.create({ data: record });
      } catch (e: any) {
        console.log(`❌ ${tableName}`, e.message);
      }
    }

    console.log(`✔ ${tableName}: ${records.length}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());