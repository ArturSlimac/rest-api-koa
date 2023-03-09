/*
  Warnings:

  - Added the required column `price` to the `Box_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `box_order` ADD COLUMN `price` DOUBLE NOT NULL;
