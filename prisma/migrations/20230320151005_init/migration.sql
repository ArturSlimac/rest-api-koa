-- CreateTable
CREATE TABLE `Product_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `syncId` INTEGER NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `Product_category_categoryId_key`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `syncId` INTEGER NULL,
    `productId` VARCHAR(191) NOT NULL,
    `unitOfMeasureId` VARCHAR(191) NOT NULL,
    `productAvailability` VARCHAR(191) NULL,
    `unitsInStock` INTEGER NULL,
    `ctgrId` INTEGER NOT NULL,

    UNIQUE INDEX `Product_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageLink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prdctId` INTEGER NOT NULL,
    `imgId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_description` (
    `pdId` INTEGER NOT NULL AUTO_INCREMENT,
    `syncId` INTEGER NULL,
    `prdctId` INTEGER NOT NULL,
    `languageId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `lister` TEXT NULL,
    `short` TEXT NULL,
    `long` TEXT NULL,

    PRIMARY KEY (`pdId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_price` (
    `ppId` INTEGER NOT NULL AUTO_INCREMENT,
    `syncId` INTEGER NULL,
    `prdctId` INTEGER NOT NULL,
    `currencyId` VARCHAR(191) NULL,
    `price` DOUBLE NULL,
    `unitOfMeasureId` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,

    UNIQUE INDEX `Product_price_prdctId_currencyId_price_key`(`prdctId`, `currencyId`, `price`),
    PRIMARY KEY (`ppId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_unit_of_measure_conversion` (
    `converterId` INTEGER NOT NULL AUTO_INCREMENT,
    `syncId` INTEGER NULL,
    `prdctId` INTEGER NOT NULL,
    `fromUnitOfMeasure` VARCHAR(191) NULL,
    `toUnitOfMeasure` VARCHAR(191) NULL,
    `fromQuantity` DOUBLE NULL,
    `toQuantity` DOUBLE NULL,

    PRIMARY KEY (`converterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `syncId` INTEGER NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `logoLink` VARCHAR(191) NULL,
    `phoneNr` VARCHAR(191) NULL,
    `street` VARCHAR(191) NULL,
    `streetNr` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `zipCode` VARCHAR(191) NULL,

    UNIQUE INDEX `Company_companyId_key`(`companyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Purchaser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `syncId` INTEGER NULL,
    `purchaserId` VARCHAR(191) NOT NULL,
    `cmpnId` INTEGER NOT NULL,
    `auth0Id` VARCHAR(191) NOT NULL DEFAULT '12345',
    `firstName` VARCHAR(191) NOT NULL DEFAULT 'anon',
    `lastName` VARCHAR(191) NOT NULL DEFAULT 'anon',
    `phoneNumber` VARCHAR(191) NOT NULL DEFAULT 'a number',

    UNIQUE INDEX `Purchaser_purchaserId_key`(`purchaserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prchsrId` INTEGER NOT NULL,
    `isPurchased` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Cart_prchsrId_key`(`prchsrId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart_items` (
    `ci_id` INTEGER NOT NULL AUTO_INCREMENT,
    `crtId` INTEGER NOT NULL,
    `prdctId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `Cart_items_crtId_prdctId_key`(`crtId`, `prdctId`),
    PRIMARY KEY (`ci_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `syncId` INTEGER NULL,
    `prchsrId` INTEGER NOT NULL,
    `processedById` INTEGER NULL,
    `orderReference` VARCHAR(191) NULL,
    `orderPostedDate` DATETIME(3) NOT NULL,
    `taxAmount` DOUBLE NOT NULL,
    `currencyId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `companyId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_item` (
    `orderItemId` INTEGER NOT NULL AUTO_INCREMENT,
    `syncId` INTEGER NULL,
    `ordrId` INTEGER NOT NULL,
    `prdctId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitOfMeasureId` VARCHAR(191) NULL,
    `netPrice` DOUBLE NULL,
    `netAmount` DOUBLE NULL,

    UNIQUE INDEX `Order_item_ordrId_prdctId_key`(`ordrId`, `prdctId`),
    PRIMARY KEY (`orderItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Delivery_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ordrId` INTEGER NOT NULL,
    `dsId` INTEGER NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `streetNr` VARCHAR(191) NOT NULL,
    `zip` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Delivery_address_ordrId_key`(`ordrId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Box` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `syncId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'generic',
    `width` DOUBLE NOT NULL,
    `height` DOUBLE NOT NULL,
    `length` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,
    `isActiveForDeliveries` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Box_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Box_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `syncId` INTEGER NULL,
    `bxId` INTEGER NOT NULL,
    `ordrId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrackTrace` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `syncId` INTEGER NULL,
    `ordrId` INTEGER NOT NULL,
    `trackcode` VARCHAR(191) NULL,
    `verification` VARCHAR(191) NULL,
    `typeOfVerif` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_ctgrId_fkey` FOREIGN KEY (`ctgrId`) REFERENCES `Product_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_images` ADD CONSTRAINT `Product_images_prdctId_fkey` FOREIGN KEY (`prdctId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_images` ADD CONSTRAINT `Product_images_imgId_fkey` FOREIGN KEY (`imgId`) REFERENCES `ImageLink`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_description` ADD CONSTRAINT `Product_description_prdctId_fkey` FOREIGN KEY (`prdctId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_price` ADD CONSTRAINT `Product_price_prdctId_fkey` FOREIGN KEY (`prdctId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_unit_of_measure_conversion` ADD CONSTRAINT `Product_unit_of_measure_conversion_prdctId_fkey` FOREIGN KEY (`prdctId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchaser` ADD CONSTRAINT `Purchaser_cmpnId_fkey` FOREIGN KEY (`cmpnId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_prchsrId_fkey` FOREIGN KEY (`prchsrId`) REFERENCES `Purchaser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart_items` ADD CONSTRAINT `Cart_items_crtId_fkey` FOREIGN KEY (`crtId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart_items` ADD CONSTRAINT `Cart_items_prdctId_fkey` FOREIGN KEY (`prdctId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_prchsrId_fkey` FOREIGN KEY (`prchsrId`) REFERENCES `Purchaser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_item` ADD CONSTRAINT `Order_item_ordrId_fkey` FOREIGN KEY (`ordrId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_item` ADD CONSTRAINT `Order_item_prdctId_fkey` FOREIGN KEY (`prdctId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery_address` ADD CONSTRAINT `Delivery_address_ordrId_fkey` FOREIGN KEY (`ordrId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Box_order` ADD CONSTRAINT `Box_order_bxId_fkey` FOREIGN KEY (`bxId`) REFERENCES `Box`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Box_order` ADD CONSTRAINT `Box_order_ordrId_fkey` FOREIGN KEY (`ordrId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrackTrace` ADD CONSTRAINT `TrackTrace_ordrId_fkey` FOREIGN KEY (`ordrId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
