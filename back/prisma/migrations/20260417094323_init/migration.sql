-- CreateEnum
CREATE TYPE "Language" AS ENUM ('FR', 'BR');

-- CreateEnum
CREATE TYPE "ArticleComponentKey" AS ENUM ('APP_JBDB', 'APP_DICTATION');

-- CreateTable
CREATE TABLE "Grade" (
    "gradeId" SERIAL NOT NULL,
    "gradeName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("gradeId")
);

-- CreateTable
CREATE TABLE "Domaine" (
    "id" TEXT NOT NULL,
    "titleKey" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Domaine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SousDomaine" (
    "id" TEXT NOT NULL,
    "titleKey" TEXT NOT NULL,
    "color" TEXT,
    "domaineId" TEXT NOT NULL,

    CONSTRAINT "SousDomaine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article" (
    "id" SERIAL NOT NULL,
    "titleKey" TEXT NOT NULL,
    "descriptionKey" TEXT NOT NULL,
    "logoSrc" TEXT NOT NULL,
    "logoAlt" TEXT NOT NULL DEFAULT 'logo',
    "languages" "Language"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "componentKey" "ArticleComponentKey",
    "domaineId" TEXT,
    "sousDomaineId" TEXT,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleGrade" (
    "articleId" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,

    CONSTRAINT "ArticleGrade_pkey" PRIMARY KEY ("articleId","gradeId")
);

-- CreateTable
CREATE TABLE "Articlelink" (
    "id" SERIAL NOT NULL,
    "articleId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Articlelink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "userFamilyName" VARCHAR(50) NOT NULL,
    "userFirstName" VARCHAR(50) NOT NULL,
    "userPseudo" VARCHAR(50),
    "userPsswd" VARCHAR(255),
    "userMail" VARCHAR(255),
    "userIcon" VARCHAR(50) NOT NULL DEFAULT 'user_student.png',
    "gradeId" INTEGER,
    "schoolId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Role" (
    "roleId" SERIAL NOT NULL,
    "roleName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "RoleUser" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "RoleUser_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "GroupUser" (
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "principal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GroupUser_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateTable
CREATE TABLE "School" (
    "schoolId" SERIAL NOT NULL,
    "schoolName" VARCHAR(500) NOT NULL,
    "schoolRef" TEXT NOT NULL,
    "schoolCp" INTEGER NOT NULL,
    "schoolCity" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("schoolId")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "classroomId" SERIAL NOT NULL,
    "classroomNumber" INTEGER NOT NULL,
    "classroomOrder" INTEGER NOT NULL DEFAULT 0,
    "classroomBorderColor" VARCHAR(255) NOT NULL,
    "classroomBackgroundColor" VARCHAR(255) NOT NULL,
    "classroomColor" VARCHAR(255) NOT NULL,
    "classroomRef" TEXT NOT NULL,
    "schoolId" INTEGER,
    "groupId" INTEGER,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("classroomId")
);

-- CreateTable
CREATE TABLE "Group" (
    "groupId" SERIAL NOT NULL,
    "groupName" VARCHAR(255) NOT NULL,
    "groupLanguage" VARCHAR(50) NOT NULL,
    "groupPrincipal" BOOLEAN NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "Link" (
    "linkId" SERIAL NOT NULL,
    "linkName" VARCHAR(500) NOT NULL,
    "linkTitleFr" VARCHAR(500) NOT NULL DEFAULT '',
    "linkTitleBr" VARCHAR(500) NOT NULL DEFAULT '',
    "linkFullNameFr" VARCHAR(500) NOT NULL DEFAULT '',
    "linkFullNameBr" VARCHAR(500) NOT NULL DEFAULT '',
    "linkRedirection" TEXT NOT NULL,
    "linkIcon" VARCHAR(255) NOT NULL,
    "linkMatter" VARCHAR(50) NOT NULL,
    "linkDescriptionFr" TEXT NOT NULL DEFAULT '',
    "linkDescriptionBr" TEXT NOT NULL DEFAULT '',
    "linkType" VARCHAR(50) NOT NULL DEFAULT 'all',

    CONSTRAINT "Link_pkey" PRIMARY KEY ("linkId")
);

-- CreateTable
CREATE TABLE "GroupLink" (
    "groupId" INTEGER NOT NULL,
    "linkId" INTEGER NOT NULL,

    CONSTRAINT "GroupLink_pkey" PRIMARY KEY ("groupId","linkId")
);

-- CreateTable
CREATE TABLE "LinkUser" (
    "userId" INTEGER NOT NULL,
    "linkId" INTEGER NOT NULL,

    CONSTRAINT "LinkUser_pkey" PRIMARY KEY ("userId","linkId")
);

-- CreateTable
CREATE TABLE "LienPermission" (
    "plId" SERIAL NOT NULL,
    "linkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LienPermission_pkey" PRIMARY KEY ("plId")
);

-- CreateTable
CREATE TABLE "Book" (
    "bookId" SERIAL NOT NULL,
    "bookTitle" VARCHAR(255) NOT NULL,
    "bookAuthor" VARCHAR(100),
    "bookPublisher" VARCHAR(100),
    "bookIsbn" VARCHAR(25),

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookId")
);

-- CreateTable
CREATE TABLE "BookEvent" (
    "bookEventId" SERIAL NOT NULL,
    "bookEventType" INTEGER NOT NULL,
    "bookEventDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookGroupId" INTEGER NOT NULL,

    CONSTRAINT "BookEvent_pkey" PRIMARY KEY ("bookEventId")
);

-- CreateTable
CREATE TABLE "Periodlibrary" (
    "periodId" SERIAL NOT NULL,
    "groupId" INTEGER,
    "periodName" VARCHAR(50) NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Periodlibrary_pkey" PRIMARY KEY ("periodId")
);

-- CreateTable
CREATE TABLE "BookGroup" (
    "bookGroupId" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "onWork" BOOLEAN NOT NULL,
    "dateAdd" TIMESTAMP(3) NOT NULL,
    "dateRemove" TIMESTAMP(3),

    CONSTRAINT "BookGroup_pkey" PRIMARY KEY ("bookGroupId")
);

-- CreateTable
CREATE TABLE "Eventlibrarytype" (
    "eventLibraryTypeId" SERIAL NOT NULL,
    "eventLibraryTypeName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Eventlibrarytype_pkey" PRIMARY KEY ("eventLibraryTypeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userPseudo_key" ON "User"("userPseudo");

-- CreateIndex
CREATE UNIQUE INDEX "User_userMail_key" ON "User"("userMail");

-- CreateIndex
CREATE UNIQUE INDEX "User_userFirstName_userFamilyName_schoolId_key" ON "User"("userFirstName", "userFamilyName", "schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "School_schoolRef_key" ON "School"("schoolRef");

-- CreateIndex
CREATE UNIQUE INDEX "School_schoolName_schoolCp_schoolCity_key" ON "School"("schoolName", "schoolCp", "schoolCity");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_classroomRef_key" ON "Classroom"("classroomRef");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_groupId_key" ON "Classroom"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_classroomRef_schoolId_key" ON "Classroom"("classroomRef", "schoolId");

-- AddForeignKey
ALTER TABLE "SousDomaine" ADD CONSTRAINT "SousDomaine_domaineId_fkey" FOREIGN KEY ("domaineId") REFERENCES "Domaine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_domaineId_fkey" FOREIGN KEY ("domaineId") REFERENCES "Domaine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_sousDomaineId_fkey" FOREIGN KEY ("sousDomaineId") REFERENCES "SousDomaine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleGrade" ADD CONSTRAINT "ArticleGrade_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleGrade" ADD CONSTRAINT "ArticleGrade_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("gradeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articlelink" ADD CONSTRAINT "Articlelink_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("gradeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("schoolId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleUser" ADD CONSTRAINT "RoleUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleUser" ADD CONSTRAINT "RoleUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupUser" ADD CONSTRAINT "GroupUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupUser" ADD CONSTRAINT "GroupUser_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("schoolId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupLink" ADD CONSTRAINT "GroupLink_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupLink" ADD CONSTRAINT "GroupLink_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("linkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkUser" ADD CONSTRAINT "LinkUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkUser" ADD CONSTRAINT "LinkUser_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("linkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LienPermission" ADD CONSTRAINT "LienPermission_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("linkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LienPermission" ADD CONSTRAINT "LienPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookEvent" ADD CONSTRAINT "BookEvent_bookGroupId_fkey" FOREIGN KEY ("bookGroupId") REFERENCES "BookGroup"("bookGroupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookEvent" ADD CONSTRAINT "BookEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookEvent" ADD CONSTRAINT "BookEvent_bookEventType_fkey" FOREIGN KEY ("bookEventType") REFERENCES "Eventlibrarytype"("eventLibraryTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Periodlibrary" ADD CONSTRAINT "Periodlibrary_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookGroup" ADD CONSTRAINT "BookGroup_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookGroup" ADD CONSTRAINT "BookGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;
