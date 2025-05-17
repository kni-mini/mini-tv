ALTER TABLE "users" RENAME COLUMN "username" TO "email";--> statement-breakpoint
DROP INDEX "users_username_index";--> statement-breakpoint
CREATE INDEX "users_email_index" ON "users" USING btree ("email") WHERE "users"."deleted_at" IS NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");