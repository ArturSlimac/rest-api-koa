/*
  Warnings:

  - The primary key for the `purchaser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[purchaserId]` on the table `Purchaser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prchsrId` to the `Purchaser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_purchaserId_fkey`;

-- AlterTable
ALTER TABLE `cart` MODIFY `purchaserId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `purchaser` DROP PRIMARY KEY,
    ADD COLUMN `prchsrId` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `purchaserId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`prchsrId`);

-- CreateIndex
CREATE UNIQUE INDEX `Purchaser_purchaserId_key` ON `Purchaser`(`purchaserId`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_purchaserId_fkey` FOREIGN KEY (`purchaserId`) REFERENCES `Purchaser`(`purchaserId`) ON DELETE RESTRICT ON UPDATE CASCADE;
