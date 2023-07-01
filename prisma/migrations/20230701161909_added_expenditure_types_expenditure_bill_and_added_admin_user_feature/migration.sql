/*
  Warnings:

  - You are about to alter the column `description` on the `Appointment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `address` on the `Appointment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `name` on the `Doctor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `name` on the `Procedure` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `mobileNumber` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(10)`.

*/
-- CreateEnum
CREATE TYPE "MODE_OF_PAYMENT" AS ENUM ('CASH', 'CHEQUE', 'DEMAND_DRAFT', 'UPI', 'BANK_TRANSFER');

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "description" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "isTrashed" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "isTrashed" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "name" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "isTrashed" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PartPayment" ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "isTrashed" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "isPartPayment" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "isTrashed" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Procedure" ALTER COLUMN "name" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "variableRate" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "isDoctorRatePercetageValue" DROP NOT NULL,
ALTER COLUMN "isOfficeRatePercetageValue" DROP NOT NULL,
ALTER COLUMN "isTechnicianRatePercetageValue" DROP NOT NULL,
ALTER COLUMN "isTrashed" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "isTrashed" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "mobileNumber" SET DATA TYPE CHAR(10),
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "isTrashed" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "mobileNumber" CHAR(10) NOT NULL,
    "isTrashed" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenditureType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "price" INTEGER NOT NULL,
    "isTrashed" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExpenditureType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expenditure" (
    "id" SERIAL NOT NULL,
    "expenditureTypeId" INTEGER NOT NULL,
    "finalPrice" INTEGER NOT NULL,
    "modeOfPayment" "MODE_OF_PAYMENT" NOT NULL DEFAULT 'CASH',
    "cashContact" CHAR(10),
    "chequeNo" TEXT,
    "ddNo" TEXT,
    "bankName" TEXT,
    "upiID" TEXT,
    "issueDate" TIMESTAMP(3),
    "description" VARCHAR(250),
    "isTrashed" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expenditure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_mobileNumber_key" ON "AdminUser"("mobileNumber");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenditure" ADD CONSTRAINT "Expenditure_expenditureTypeId_fkey" FOREIGN KEY ("expenditureTypeId") REFERENCES "ExpenditureType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
