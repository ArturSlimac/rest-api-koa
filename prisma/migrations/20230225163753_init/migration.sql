-- DropForeignKey
ALTER TABLE `product_description` DROP FOREIGN KEY `Product_description_productId_fkey`;

-- AddForeignKey
ALTER TABLE `Product_description` ADD CONSTRAINT `Product_description_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE CASCADE ON UPDATE CASCADE;
