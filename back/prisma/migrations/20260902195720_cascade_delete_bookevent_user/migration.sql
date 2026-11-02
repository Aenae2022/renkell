-- DropForeignKey
ALTER TABLE "BookEvent" DROP CONSTRAINT "BookEvent_userId_fkey";

-- AddForeignKey
ALTER TABLE "BookEvent" ADD CONSTRAINT "BookEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
