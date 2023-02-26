-- AlterTable
ALTER TABLE `product_price` MODIFY `currencyId` VARCHAR(191) NULL,
    MODIFY `price` DOUBLE NULL,
    MODIFY `unitOfMeasureId` VARCHAR(191) NULL,
    MODIFY `quantity` INTEGER NULL;

-- AlterTable
ALTER TABLE `product_unit_of_measure_conversion` MODIFY `fromUnitOfMeasure` VARCHAR(191) NULL,
    MODIFY `toUnitOfMeasure` VARCHAR(191) NULL,
    MODIFY `fromQuantity` DOUBLE NULL,
    MODIFY `toQuantity` DOUBLE NULL;
