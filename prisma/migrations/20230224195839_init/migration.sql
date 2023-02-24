/*
  Warnings:

  - You are about to drop the `productdescription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `productdescription` DROP FOREIGN KEY `ProductDescription_productId_fkey`;

-- DropTable
DROP TABLE `productdescription`;

-- CreateTable
CREATE TABLE `Product_description` (
    `pdId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,
    `languageId` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NULL,
    `productListerDescription` VARCHAR(191) NULL,
    `productShortDescription` VARCHAR(191) NULL,
    `productLongDescription` VARCHAR(191) NULL,

    PRIMARY KEY (`pdId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_price` (
    `ppId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,
    `currencyId` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `unitOfMeasureId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`ppId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_unit_of_measure_conversion` (
    `converterId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,
    `fromUnitOfMeasure` VARCHAR(191) NOT NULL,
    `toUnitOfMeasure` VARCHAR(191) NOT NULL,
    `fromQuantity` DOUBLE NOT NULL,
    `toQuantity` DOUBLE NOT NULL,

    PRIMARY KEY (`converterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product_description` ADD CONSTRAINT `Product_description_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_price` ADD CONSTRAINT `Product_price_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_unit_of_measure_conversion` ADD CONSTRAINT `Product_unit_of_measure_conversion_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
