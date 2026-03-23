/*
  Warnings:

  - Added the required column `difficulty` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceLevel` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interviewType` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobRole` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionCount` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "experienceLevel" TEXT NOT NULL,
ADD COLUMN     "interviewType" TEXT NOT NULL,
ADD COLUMN     "jobRole" TEXT NOT NULL,
ADD COLUMN     "questionCount" INTEGER NOT NULL,
ADD COLUMN     "topics" TEXT[];
