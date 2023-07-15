/*
  Warnings:

  - You are about to drop the column `isDoctorRatePercetageValue` on the `Procedure` table. All the data in the column will be lost.
  - You are about to drop the column `isOfficeRatePercetageValue` on the `Procedure` table. All the data in the column will be lost.
  - You are about to drop the column `isTechnicianRatePercetageValue` on the `Procedure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Procedure" DROP COLUMN "isDoctorRatePercetageValue",
DROP COLUMN "isOfficeRatePercetageValue",
DROP COLUMN "isTechnicianRatePercetageValue",
ADD COLUMN     "isDoctorRatePercentageValue" BOOLEAN DEFAULT false,
ADD COLUMN     "isOfficeRatePercentageValue" BOOLEAN DEFAULT false,
ADD COLUMN     "isTechnicianRatePercentageValue" BOOLEAN DEFAULT false;
