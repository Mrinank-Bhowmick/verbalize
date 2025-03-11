CREATE TABLE "agents" (
	"agent_id" varchar(8) PRIMARY KEY NOT NULL,
	"client_id" text NOT NULL,
	"agent_name" varchar(15) NOT NULL,
	"system_instruction" text,
	"description" varchar(30),
	"createdAt" timestamp DEFAULT now()
);
