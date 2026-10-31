-- CreateTable
CREATE TABLE "ExerciseAccess" (
    "tokenHash" VARCHAR(64) NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseAccess_pkey" PRIMARY KEY ("tokenHash")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseAccess_groupId_key" ON "ExerciseAccess"("groupId");

-- AddForeignKey
ALTER TABLE "ExerciseAccess" ADD CONSTRAINT "ExerciseAccess_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;
