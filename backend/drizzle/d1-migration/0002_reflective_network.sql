CREATE TABLE `Analytics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`agentId` text NOT NULL,
	`clientIP` text NOT NULL,
	`sessionId` text NOT NULL,
	`totalTokensUsed` integer DEFAULT 0 NOT NULL,
	`messageHistory` text NOT NULL,
	`conversationCount` integer DEFAULT 1 NOT NULL,
	`lastUpdated` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
