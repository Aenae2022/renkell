/*
  Warnings:

  - Added the required column `tokenEncrypted` to the `ExerciseAccess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseAccess" ADD COLUMN     "tokenEncrypted" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Exerciselinks" (
    "linkId" SERIAL NOT NULL,
    "linkName" VARCHAR(500) NOT NULL,
    "linkTitleFr" VARCHAR(500) NOT NULL DEFAULT '',
    "linkTitleBr" VARCHAR(500) NOT NULL DEFAULT '',
    "linkFullNameFr" VARCHAR(500) NOT NULL DEFAULT '',
    "linkFullNameBr" VARCHAR(500) NOT NULL DEFAULT '',
    "linkRedirection" VARCHAR(255) NOT NULL,
    "linkIcon" VARCHAR(255) NOT NULL,
    "linkMatter" VARCHAR(50) NOT NULL,
    "linkActif" BOOLEAN NOT NULL DEFAULT false,
    "tokenHash" VARCHAR(64) NOT NULL,

    CONSTRAINT "Exerciselinks_pkey" PRIMARY KEY ("linkId")
);

-- AddForeignKey
ALTER TABLE "Exerciselinks" ADD CONSTRAINT "Exerciselinks_tokenHash_fkey" FOREIGN KEY ("tokenHash") REFERENCES "ExerciseAccess"("tokenHash") ON DELETE CASCADE ON UPDATE CASCADE;
