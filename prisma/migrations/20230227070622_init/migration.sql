-- DropForeignKey
ALTER TABLE `cart_items` DROP FOREIGN KEY `Cart_items_cartId_fkey`;

-- AddForeignKey
ALTER TABLE `Cart_items` ADD CONSTRAINT `Cart_items_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`cartId`) ON DELETE CASCADE ON UPDATE CASCADE;
