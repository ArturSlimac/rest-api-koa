/*
  Warnings:

  - You are about to drop the column `productName` on the `product_description` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product_description` DROP COLUMN `productName`,
    ADD COLUMN `name` VARCHAR(191) NULL;
