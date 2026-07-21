CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`direction` text NOT NULL,
	`service` text NOT NULL,
	`area` integer NOT NULL,
	`detail` integer NOT NULL,
	`estimate` integer NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text,
	`message` text,
	`status` text DEFAULT 'new' NOT NULL
);
