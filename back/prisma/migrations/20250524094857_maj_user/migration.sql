-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "userFamilyName" VARCHAR(50) NOT NULL,
    "userFirstName" VARCHAR(50) NOT NULL,
    "userType" VARCHAR(50) NOT NULL DEFAULT 'invit',
    "userPseudo" VARCHAR(50),
    "userPsswd" VARCHAR(255),
    "userMail" VARCHAR(255),
    "userIcon" VARCHAR(50) NOT NULL DEFAULT 'user_student.png',

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "LinkUser" (
    "userId" INTEGER NOT NULL,
    "linkId" INTEGER NOT NULL,

    CONSTRAINT "LinkUser_pkey" PRIMARY KEY ("userId","linkId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userPseudo_key" ON "User"("userPseudo");

-- CreateIndex
CREATE UNIQUE INDEX "User_userMail_key" ON "User"("userMail");

-- AddForeignKey
ALTER TABLE "LinkUser" ADD CONSTRAINT "LinkUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkUser" ADD CONSTRAINT "LinkUser_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("linkId") ON DELETE CASCADE ON UPDATE CASCADE;
