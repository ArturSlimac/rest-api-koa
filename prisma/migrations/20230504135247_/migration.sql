/*
  Warnings:

  - Added the required column `splrId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `splrId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_splrId_fkey` FOREIGN KEY (`splrId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
