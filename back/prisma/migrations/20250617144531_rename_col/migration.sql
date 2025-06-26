-- DropForeignKey
ALTER TABLE "BookEvent" DROP CONSTRAINT "BookEvent_groupBookId_fkey";

-- Rename column in BookEvent
ALTER TABLE "BookEvent" RENAME COLUMN "groupBookId" TO "bookGroupId";

-- Rename column in BookGroup
ALTER TABLE "BookGroup" DROP CONSTRAINT "BookGroup_pkey";
ALTER TABLE "BookGroup" RENAME COLUMN "groupBookId" TO "bookGroupId";
ALTER TABLE "BookGroup" ADD CONSTRAINT "BookGroup_pkey" PRIMARY KEY ("bookGroupId");

-- AddForeignKey with new column name
ALTER TABLE "BookEvent" ADD CONSTRAINT "BookEvent_bookGroupId_fkey"
  FOREIGN KEY ("bookGroupId") REFERENCES "BookGroup"("bookGroupId") ON DELETE RESTRICT ON UPDATE CASCADE;
