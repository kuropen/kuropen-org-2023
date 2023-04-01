CREATE TABLE `whatsnew` (
	`id` int NOT NULL AUTO_INCREMENT,
	`source` varchar(50) NOT NULL,
	`title` varchar(192),
	`date` datetime,
	`is_external` tinyint(1) NOT NULL DEFAULT '0',
	`url` varchar(255) NOT NULL,
	`updated_at` timestamp NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `IDX_UQ_SRC_URL` (`source`, `url`),
	KEY `IDX_SRC` (`source`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

-- Hash column for update check
ALTER TABLE `whatsnew`
    ADD COLUMN `hash` varchar(255) NOT NULL DEFAULT '' AFTER `url`,
    ADD INDEX `IDX_HASH` (`hash`);
