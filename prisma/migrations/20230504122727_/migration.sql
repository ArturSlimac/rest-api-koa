/*
  Warnings:

  - Added the required column `cmpnId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `cmpnId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_cmpnId_fkey` FOREIGN KEY (`cmpnId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
