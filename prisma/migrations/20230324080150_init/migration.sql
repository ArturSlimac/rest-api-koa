-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('delivered', 'out_for_delivery', 'shipped', 'processed', 'ordered') NOT NULL;
