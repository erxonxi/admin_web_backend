-- CreateTable
CREATE TABLE "scripts_group" (
    "id" SERIAL NOT NULL,
    "script_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "groups.name_unique" ON "groups"("name");

-- AddForeignKey
ALTER TABLE "scripts_group" ADD FOREIGN KEY ("script_id") REFERENCES "scripts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scripts_group" ADD FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
