-- AlterTable
ALTER TABLE `box` ADD COLUMN `syncId` INTEGER NULL;

-- AlterTable
ALTER TABLE `box_order` ADD COLUMN `syncId` INTEGER NULL;

-- AlterTable
ALTER TABLE `company` ADD COLUMN `syncId` INTEGER NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `orderReference` VARCHAR(191) NULL,
    ADD COLUMN `syncId` INTEGER NULL;

-- AlterTable
ALTER TABLE `order_item` ADD COLUMN `netAmount` DOUBLE NULL,
    ADD COLUMN `syncId` INTEGER NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `syncId` INTEGER NULL;

-- AlterTable
ALTER TABLE `product_category` ADD COLUMN `syncId` INTEGER NULL;

-- AlterTable
ALTER TABLE `product_description` ADD COLUMN `syncId` INTEGER NULL;

-- AlterTable
ALTER TABLE `product_price` ADD COLUMN `syncId` INTEGER NULL;

-- AlterTable
ALTER TABLE `product_unit_of_measure_conversion` ADD COLUMN `syncId` INTEGER NULL;

-- AlterTable
ALTER TABLE `purchaser` ADD COLUMN `syncId` INTEGER NULL;
