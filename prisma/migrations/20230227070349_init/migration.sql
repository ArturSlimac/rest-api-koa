/*
  Warnings:

  - A unique constraint covering the columns `[purchaserId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `cart` MODIFY `isPurchased` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `Cart_purchaserId_key` ON `Cart`(`purchaserId`);
