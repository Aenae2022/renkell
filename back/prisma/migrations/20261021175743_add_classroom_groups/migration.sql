-- CreateTable
CREATE TABLE "ClassroomGroup" (
    "classroomId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "ClassroomGroup_pkey" PRIMARY KEY ("classroomId","groupId")
);

-- AddForeignKey
ALTER TABLE "ClassroomGroup" ADD CONSTRAINT "ClassroomGroup_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("classroomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomGroup" ADD CONSTRAINT "ClassroomGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;
