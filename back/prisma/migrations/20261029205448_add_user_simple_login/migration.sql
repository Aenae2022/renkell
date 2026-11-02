-- CreateTable
CREATE TABLE "UserSimpleLogin" (
    "userId" INTEGER NOT NULL,
    "passwordSimpleHash" TEXT NOT NULL,

    CONSTRAINT "UserSimpleLogin_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "UserSimpleLogin" ADD CONSTRAINT "UserSimpleLogin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
