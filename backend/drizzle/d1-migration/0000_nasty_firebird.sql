CREATE TABLE `deployedAgents` (
	`agentId` text PRIMARY KEY NOT NULL,
	`clientId` text NOT NULL,
	`agentName` text NOT NULL,
	`firstMessage` text NOT NULL,
	`systemInstruction` text,
	`description` text,
	`isDeployed` integer DEFAULT true,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `savedAgents` (
	`agentId` text PRIMARY KEY NOT NULL,
	`clientId` text NOT NULL,
	`agentName` text NOT NULL,
	`firstMessage` text NOT NULL,
	`systemInstruction` text,
	`description` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
