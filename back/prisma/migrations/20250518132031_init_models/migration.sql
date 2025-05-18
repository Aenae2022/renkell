-- CreateTable
CREATE TABLE "Classroom" (
    "classroomId" SERIAL NOT NULL,
    "classroomNumber" INTEGER NOT NULL,
    "classroomOrder" INTEGER NOT NULL DEFAULT 0,
    "classroomBorderColor" VARCHAR(255) NOT NULL,
    "classroomBackgroundColor" VARCHAR(255) NOT NULL,
    "classroomColor" VARCHAR(255) NOT NULL,
    "schoolId" INTEGER,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("classroomId")
);

-- CreateTable
CREATE TABLE "Link" (
    "linkId" SERIAL NOT NULL,
    "linkName" VARCHAR(500) NOT NULL,
    "linkTitleFr" VARCHAR(500) DEFAULT '',
    "linkTitleBr" VARCHAR(500) DEFAULT '',
    "linkFullNameFr" VARCHAR(500) DEFAULT '',
    "linkFullNameBr" VARCHAR(500) DEFAULT '',
    "linkRedirection" TEXT NOT NULL,
    "linkIcon" VARCHAR(255) NOT NULL,
    "linkMatter" VARCHAR(50) NOT NULL,
    "linkDescriptionFr" TEXT DEFAULT '',
    "linkDescriptionBr" TEXT DEFAULT '',
    "linkType" VARCHAR(50) NOT NULL DEFAULT 'all',

    CONSTRAINT "Link_pkey" PRIMARY KEY ("linkId")
);

-- CreateTable
CREATE TABLE "LinkClassroom" (
    "classroomId" INTEGER NOT NULL,
    "linkId" INTEGER NOT NULL,

    CONSTRAINT "LinkClassroom_pkey" PRIMARY KEY ("classroomId","linkId")
);

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("schoolId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkClassroom" ADD CONSTRAINT "LinkClassroom_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("classroomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkClassroom" ADD CONSTRAINT "LinkClassroom_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("linkId") ON DELETE CASCADE ON UPDATE CASCADE;
