ALTER TABLE "deployedAgents" ADD COLUMN "isDeployed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "savedAgents" ADD COLUMN "isDeployed" boolean DEFAULT false;