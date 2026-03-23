/*
  Warnings:

  - You are about to drop the column `attempt` on the `Attempt` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[interviewId,userId,attemptNo]` on the table `Attempt` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attemptNo` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Attempt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attempt" DROP COLUMN "attempt",
ADD COLUMN     "attemptNo" INTEGER NOT NULL,
ADD COLUMN     "feedback" JSONB,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attempt_interviewId_userId_attemptNo_key" ON "Attempt"("interviewId", "userId", "attemptNo");
