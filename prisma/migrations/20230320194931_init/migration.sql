/*
  Warnings:

  - A unique constraint covering the columns `[trackcode,verification]` on the table `TrackTrace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TrackTrace_trackcode_verification_key` ON `TrackTrace`(`trackcode`, `verification`);
