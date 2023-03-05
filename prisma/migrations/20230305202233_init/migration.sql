/*
  Warnings:

  - You are about to drop the column `productListerDescription` on the `product_description` table. All the data in the column will be lost.
  - You are about to drop the column `productLongDescription` on the `product_description` table. All the data in the column will be lost.
  - You are about to drop the column `productShortDescription` on the `product_description` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product_description` DROP COLUMN `productListerDescription`,
    DROP COLUMN `productLongDescription`,
    DROP COLUMN `productShortDescription`,
    ADD COLUMN `lister` TEXT NULL,
    ADD COLUMN `long` TEXT NULL,
    ADD COLUMN `short` TEXT NULL;
