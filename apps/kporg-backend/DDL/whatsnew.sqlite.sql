-- SPDX-FileCopyrightText: 2023 2023 Kuropen <hy-kuropen@eternie-labs.net>
--
-- SPDX-License-Identifier: MPL-2.0

-- Path: apps\kporg-backend\DDL\whatsnew.sqlite.sql
DROP TABLE IF EXISTS whatsnew;
CREATE TABLE whatsnew (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	source varchar(50) NOT NULL,
	title varchar(192),
	date datetime,
	is_external tinyint(1) NOT NULL DEFAULT '0',
	url varchar(255) NOT NULL,
	updated_at timestamp NOT NULL,
	hash varchar(255) NOT NULL DEFAULT ''
);
