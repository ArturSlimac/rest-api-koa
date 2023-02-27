/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productId]` on the table `Cart_items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Cart_items_cartId_productId_key` ON `Cart_items`(`cartId`, `productId`);
