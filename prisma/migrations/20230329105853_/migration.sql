-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `Order_item_ordrId_fkey`;

-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `Order_item_prdctId_fkey`;

-- AlterTable
ALTER TABLE `order_item` MODIFY `ordrId` INTEGER NULL,
    MODIFY `prdctId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Order_item` ADD CONSTRAINT `Order_item_ordrId_fkey` FOREIGN KEY (`ordrId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_item` ADD CONSTRAINT `Order_item_prdctId_fkey` FOREIGN KEY (`prdctId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
