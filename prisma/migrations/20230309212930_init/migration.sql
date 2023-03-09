/*
  Warnings:

  - You are about to drop the column `cstmrId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `cstmrId` on the `purchaser` table. All the data in the column will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `prchsrId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cmpnId` to the `Purchaser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_cstmrId_fkey`;

-- DropForeignKey
ALTER TABLE `purchaser` DROP FOREIGN KEY `Purchaser_cstmrId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `cstmrId`,
    ADD COLUMN `companyId` INTEGER NULL,
    ADD COLUMN `prchsrId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `purchaser` DROP COLUMN `cstmrId`,
    ADD COLUMN `cmpnId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `customer`;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` VARCHAR(191) NOT NULL,
    `logoLink` VARCHAR(191) NULL,
    `phoneNr` VARCHAR(191) NULL,
    `street` VARCHAR(191) NULL,
    `streetNr` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `zipCode` VARCHAR(191) NULL,

    UNIQUE INDEX `Company_companyId_key`(`companyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Purchaser` ADD CONSTRAINT `Purchaser_cmpnId_fkey` FOREIGN KEY (`cmpnId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_prchsrId_fkey` FOREIGN KEY (`prchsrId`) REFERENCES `Purchaser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
