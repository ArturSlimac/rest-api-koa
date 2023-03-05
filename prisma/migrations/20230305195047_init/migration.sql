-- CreateTable
CREATE TABLE `Product_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `Product_category_categoryId_key`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,
    `unitOfMeasureId` VARCHAR(191) NOT NULL,
    `productAvailability` VARCHAR(191) NULL,
    `unitsInStock` INTEGER NULL,
    `imgLink` VARCHAR(191) NULL,
    `categoryId` VARCHAR(191) NOT NULL DEFAULT '-',

    UNIQUE INDEX `Product_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_description` (
    `pdId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,
    `languageId` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NULL,
    `productListerDescription` TEXT NULL,
    `productShortDescription` TEXT NULL,
    `productLongDescription` TEXT NULL,

    PRIMARY KEY (`pdId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_price` (
    `ppId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,
    `currencyId` VARCHAR(191) NULL,
    `price` DOUBLE NULL,
    `unitOfMeasureId` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,

    PRIMARY KEY (`ppId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_unit_of_measure_conversion` (
    `converterId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,
    `fromUnitOfMeasure` VARCHAR(191) NULL,
    `toUnitOfMeasure` VARCHAR(191) NULL,
    `fromQuantity` DOUBLE NULL,
    `toQuantity` DOUBLE NULL,

    PRIMARY KEY (`converterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `cstmrId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` VARCHAR(191) NOT NULL,
    `logoLink` VARCHAR(191) NULL,
    `phoneNr` VARCHAR(191) NULL,
    `street` VARCHAR(191) NULL,
    `streetNr` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `zipCode` VARCHAR(191) NULL,

    UNIQUE INDEX `Customer_customerId_key`(`customerId`),
    PRIMARY KEY (`cstmrId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Purchaser` (
    `purchaserId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` VARCHAR(191) NOT NULL,
    `auth0Id` VARCHAR(191) NOT NULL DEFAULT '12345',
    `firstName` VARCHAR(191) NOT NULL DEFAULT 'anon',
    `lastName` VARCHAR(191) NOT NULL DEFAULT 'anon',
    `phoneNumber` VARCHAR(191) NOT NULL DEFAULT 'a number',

    PRIMARY KEY (`purchaserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `cartId` INTEGER NOT NULL AUTO_INCREMENT,
    `purchaserId` INTEGER NOT NULL,
    `isPurchased` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`cartId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart_items` (
    `ci_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cartId` INTEGER NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `Cart_items_cartId_productId_key`(`cartId`, `productId`),
    PRIMARY KEY (`ci_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Product_category`(`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_description` ADD CONSTRAINT `Product_description_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_price` ADD CONSTRAINT `Product_price_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_unit_of_measure_conversion` ADD CONSTRAINT `Product_unit_of_measure_conversion_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchaser` ADD CONSTRAINT `Purchaser_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_purchaserId_fkey` FOREIGN KEY (`purchaserId`) REFERENCES `Purchaser`(`purchaserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart_items` ADD CONSTRAINT `Cart_items_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`cartId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart_items` ADD CONSTRAINT `Cart_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE CASCADE ON UPDATE CASCADE;
