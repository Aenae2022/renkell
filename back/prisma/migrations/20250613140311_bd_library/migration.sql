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
CREATE TABLE "Eventlibrarytype" (
    "eventLibraryTypeId" SERIAL NOT NULL,
    "eventLibraryTypeName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Eventlibrarytype_pkey" PRIMARY KEY ("eventLibraryTypeId")
);

-- CreateTable
CREATE TABLE "Periodlibrary" (
    "periodId" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "periodName" VARCHAR(50) NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Periodlibrary_pkey" PRIMARY KEY ("periodId")
);

-- CreateTable
CREATE TABLE "BookGroup" (
    "groupBookId" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "onWork" BOOLEAN NOT NULL,
    "dateAdd" TIMESTAMP(3) NOT NULL,
    "dateRemove" TIMESTAMP(3),

    CONSTRAINT "BookGroup_pkey" PRIMARY KEY ("groupBookId")
);

-- CreateTable
CREATE TABLE "BookEvent" (
    "bookEventId" SERIAL NOT NULL,
    "bookEventType" INTEGER NOT NULL,
    "bookEventDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupBookId" INTEGER NOT NULL,

    CONSTRAINT "BookEvent_pkey" PRIMARY KEY ("bookEventId")
);

-- AddForeignKey
ALTER TABLE "Periodlibrary" ADD CONSTRAINT "Periodlibrary_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookGroup" ADD CONSTRAINT "BookGroup_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookGroup" ADD CONSTRAINT "BookGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookEvent" ADD CONSTRAINT "BookEvent_groupBookId_fkey" FOREIGN KEY ("groupBookId") REFERENCES "BookGroup"("groupBookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookEvent" ADD CONSTRAINT "BookEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookEvent" ADD CONSTRAINT "BookEvent_bookEventType_fkey" FOREIGN KEY ("bookEventType") REFERENCES "Eventlibrarytype"("eventLibraryTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;
