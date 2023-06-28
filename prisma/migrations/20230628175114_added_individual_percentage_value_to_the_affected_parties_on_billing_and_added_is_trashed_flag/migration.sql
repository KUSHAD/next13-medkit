/*
  Warnings:

  - You are about to drop the column `percentageValue` on the `Procedure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "isTrashed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "isTrashed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "isTrashed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PartPayment" ADD COLUMN     "isTrashed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "isTrashed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Procedure" DROP COLUMN "percentageValue",
ADD COLUMN     "isDoctorRatePercetageValue" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isOfficeRatePercetageValue" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTechnicianRatePercetageValue" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTrashed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "isTrashed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isTrashed" BOOLEAN NOT NULL DEFAULT false;
