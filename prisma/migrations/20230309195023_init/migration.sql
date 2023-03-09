/*
  Warnings:

  - A unique constraint covering the columns `[ordrId]` on the table `Delivery_address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Delivery_address_ordrId_key` ON `Delivery_address`(`ordrId`);
