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
    `imgLnk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product_images` ADD CONSTRAINT `Product_images_prdctId_fkey` FOREIGN KEY (`prdctId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_images` ADD CONSTRAINT `Product_images_imgLnk_fkey` FOREIGN KEY (`imgLnk`) REFERENCES `ImageLink`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
