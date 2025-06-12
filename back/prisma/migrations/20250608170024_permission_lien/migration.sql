-- CreateTable
CREATE TABLE "LienPermission" (
    "plId" SERIAL NOT NULL,
    "linkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LienPermission_pkey" PRIMARY KEY ("plId")
);

-- AddForeignKey
ALTER TABLE "LienPermission" ADD CONSTRAINT "LienPermission_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("linkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LienPermission" ADD CONSTRAINT "LienPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
