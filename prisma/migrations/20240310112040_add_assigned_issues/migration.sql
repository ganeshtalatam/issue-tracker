-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assignedUserID` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedUserID_fkey` FOREIGN KEY (`assignedUserID`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
