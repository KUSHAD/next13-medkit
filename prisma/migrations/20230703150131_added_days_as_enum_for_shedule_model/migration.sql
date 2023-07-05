/*
  Warnings:

  - The `day` column on the `Schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DAY" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "day",
ADD COLUMN     "day" "DAY" NOT NULL DEFAULT 'MONDAY';
