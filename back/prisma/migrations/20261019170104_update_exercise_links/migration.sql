/*
  Warnings:

  - You are about to drop the column `linkFullNameBr` on the `Exerciselinks` table. All the data in the column will be lost.
  - You are about to drop the column `linkFullNameFr` on the `Exerciselinks` table. All the data in the column will be lost.
  - You are about to drop the column `linkIcon` on the `Exerciselinks` table. All the data in the column will be lost.
  - You are about to drop the column `linkMatter` on the `Exerciselinks` table. All the data in the column will be lost.
  - You are about to drop the column `linkName` on the `Exerciselinks` table. All the data in the column will be lost.
  - You are about to drop the column `linkTitleBr` on the `Exerciselinks` table. All the data in the column will be lost.
  - You are about to drop the column `linkTitleFr` on the `Exerciselinks` table. All the data in the column will be lost.
  - You are about to alter the column `linkRedirection` on the `Exerciselinks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - Added the required column `linkExId` to the `Exerciselinks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkParams` to the `Exerciselinks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exerciselinks" DROP COLUMN "linkFullNameBr",
DROP COLUMN "linkFullNameFr",
DROP COLUMN "linkIcon",
DROP COLUMN "linkMatter",
DROP COLUMN "linkName",
DROP COLUMN "linkTitleBr",
DROP COLUMN "linkTitleFr",
ADD COLUMN     "linkExId" VARCHAR(50) NOT NULL,
ADD COLUMN     "linkParams" JSONB NOT NULL,
ALTER COLUMN "linkRedirection" SET DATA TYPE VARCHAR(50);
