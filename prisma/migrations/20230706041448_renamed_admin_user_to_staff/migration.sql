/*
  Warnings:

  - You are about to drop the `AdminUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AdminUser";

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "mobileNumber" CHAR(10) NOT NULL,
    "isTrashed" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_mobileNumber_key" ON "Staff"("mobileNumber");
