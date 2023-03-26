/*
  Warnings:

  - You are about to drop the column `orderupdatedDate` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `orderupdatedDate`,
    ADD COLUMN `orderUpdatedDate` DATETIME(3) NULL;
