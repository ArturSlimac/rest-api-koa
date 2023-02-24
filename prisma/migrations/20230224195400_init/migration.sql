/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `productId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ProductDescription` (
    `pdId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,
    `languageId` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NULL,
    `productListerDescription` VARCHAR(191) NULL,
    `productShortDescription` VARCHAR(191) NULL,
    `productLongDescription` VARCHAR(191) NULL,

    PRIMARY KEY (`pdId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Product_productId_key` ON `Product`(`productId`);

-- AddForeignKey
ALTER TABLE `ProductDescription` ADD CONSTRAINT `ProductDescription_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
