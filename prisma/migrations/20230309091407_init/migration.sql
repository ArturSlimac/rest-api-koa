-- CreateTable
CREATE TABLE `Box` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
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
    `bxId` INTEGER NOT NULL,
    `ordrId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Box_order` ADD CONSTRAINT `Box_order_bxId_fkey` FOREIGN KEY (`bxId`) REFERENCES `Box`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Box_order` ADD CONSTRAINT `Box_order_ordrId_fkey` FOREIGN KEY (`ordrId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
