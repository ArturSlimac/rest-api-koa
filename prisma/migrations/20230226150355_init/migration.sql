/*
  Warnings:

  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[customerId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cstmrId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `purchaser` DROP FOREIGN KEY `Purchaser_customerId_fkey`;

-- AlterTable
ALTER TABLE `customer` DROP PRIMARY KEY,
    ADD COLUMN `cstmrId` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `customerId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`cstmrId`);

-- AlterTable
ALTER TABLE `purchaser` MODIFY `customerId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_customerId_key` ON `Customer`(`customerId`);

-- AddForeignKey
ALTER TABLE `Purchaser` ADD CONSTRAINT `Purchaser_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;
