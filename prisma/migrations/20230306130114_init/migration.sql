-- CreateTable
CREATE TABLE `Order` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` VARCHAR(191) NOT NULL,
    `processedById` INTEGER NULL,
    `orderPostedDate` DATETIME(3) NOT NULL,
    `taxAmount` DOUBLE NOT NULL,
    `currencyId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `track_trace` VARCHAR(191) NULL,

    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;
