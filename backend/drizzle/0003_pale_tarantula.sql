CREATE TABLE "savedAgents" (
	"agentId" varchar(8) PRIMARY KEY NOT NULL,
	"clientId" text NOT NULL,
	"agentName" varchar(15) NOT NULL,
	"firstMessage" text NOT NULL,
	"systemInstruction" text,
	"description" varchar(30),
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "agents" RENAME TO "deployedAgents";--> statement-breakpoint
ALTER TABLE "deployedAgents" DROP COLUMN "agentId";--> statement-breakpoint
ALTER TABLE "deployedAgents" DROP COLUMN "clientId";--> statement-breakpoint
ALTER TABLE "deployedAgents" DROP COLUMN "agentName";--> statement-breakpoint
ALTER TABLE "deployedAgents" DROP COLUMN "firstMessage";--> statement-breakpoint
ALTER TABLE "deployedAgents" DROP COLUMN "systemInstruction";--> statement-breakpoint
ALTER TABLE "deployedAgents" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "deployedAgents" DROP COLUMN "createdAt";