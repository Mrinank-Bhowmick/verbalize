CREATE TABLE `Agents` (
	`agentId` text PRIMARY KEY NOT NULL,
	`clientId` text NOT NULL,
	`agentName` text NOT NULL,
	`firstMessage` text NOT NULL,
	`systemInstruction` text,
	`description` text,
	`isDeployed` integer DEFAULT 0 NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DROP TABLE `deployedAgents`;--> statement-breakpoint
DROP TABLE `savedAgents`;