-- CreateTable
CREATE TABLE `Delivery_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ordrId` INTEGER NOT NULL,
    `dsId` INTEGER NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `streetNr` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `zip` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Delivery_address` ADD CONSTRAINT `Delivery_address_ordrId_fkey` FOREIGN KEY (`ordrId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
