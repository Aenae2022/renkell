-- CreateTable
CREATE TABLE "School" (
    "schoolId" SERIAL NOT NULL,
    "schoolName" VARCHAR(500) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("schoolId")
);
