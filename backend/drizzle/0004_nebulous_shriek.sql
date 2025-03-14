ALTER TABLE "deployedAgents" ADD COLUMN "agentId" varchar(8) PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "deployedAgents" ADD COLUMN "clientId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "deployedAgents" ADD COLUMN "agentName" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "deployedAgents" ADD COLUMN "firstMessage" text NOT NULL;--> statement-breakpoint
ALTER TABLE "deployedAgents" ADD COLUMN "systemInstruction" text;--> statement-breakpoint
ALTER TABLE "deployedAgents" ADD COLUMN "description" varchar(30);--> statement-breakpoint
ALTER TABLE "deployedAgents" ADD COLUMN "createdAt" timestamp DEFAULT now();