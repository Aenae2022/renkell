-- CreateTable
CREATE TABLE "ExerciseAttempt" (
    "attemptId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER,
    "groupName" VARCHAR(255),
    "exId" VARCHAR(100) NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durationSeconds" INTEGER,
    "score" INTEGER NOT NULL,
    "seuilAcquis" INTEGER NOT NULL,
    "seuilEca" INTEGER NOT NULL,
    "result" VARCHAR(10) NOT NULL,
    "traceData" JSONB NOT NULL,

    CONSTRAINT "ExerciseAttempt_pkey" PRIMARY KEY ("attemptId")
);

-- CreateIndex
CREATE INDEX "ExerciseAttempt_userId_completedAt_idx" ON "ExerciseAttempt"("userId", "completedAt");

-- CreateIndex
CREATE INDEX "ExerciseAttempt_groupId_completedAt_idx" ON "ExerciseAttempt"("groupId", "completedAt");

-- CreateIndex
CREATE INDEX "ExerciseAttempt_exId_completedAt_idx" ON "ExerciseAttempt"("exId", "completedAt");

-- AddForeignKey
ALTER TABLE "ExerciseAttempt" ADD CONSTRAINT "ExerciseAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseAttempt" ADD CONSTRAINT "ExerciseAttempt_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;
