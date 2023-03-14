/*
  Warnings:

  - You are about to drop the column `imgLink` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `imgLnk` on the `product_images` table. All the data in the column will be lost.
  - Added the required column `imgId` to the `Product_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product_images` DROP FOREIGN KEY `Product_images_imgLnk_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `imgLink`;

-- AlterTable
ALTER TABLE `product_images` DROP COLUMN `imgLnk`,
    ADD COLUMN `imgId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product_images` ADD CONSTRAINT `Product_images_imgId_fkey` FOREIGN KEY (`imgId`) REFERENCES `ImageLink`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
