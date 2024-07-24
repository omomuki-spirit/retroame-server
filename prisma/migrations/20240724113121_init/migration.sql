-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(16) NOT NULL,
    `loginId` VARCHAR(32) NOT NULL,
    `loginPassword` VARCHAR(64) NOT NULL,
    `mapNum` INTEGER NOT NULL DEFAULT 0,
    `mapX` INTEGER NOT NULL DEFAULT 0,
    `mapY` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_name_key`(`name`),
    UNIQUE INDEX `users_loginId_key`(`loginId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
