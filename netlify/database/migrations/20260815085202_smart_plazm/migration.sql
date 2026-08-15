CREATE TABLE "signups" (
	"contact_key" text PRIMARY KEY,
	"name" text NOT NULL,
	"trade" text NOT NULL,
	"contact" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "signups_contact_key_idx" ON "signups" ("contact_key");