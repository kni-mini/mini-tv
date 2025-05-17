ALTER TABLE "announcements" RENAME COLUMN "user_id" TO "organization_id";--> statement-breakpoint
ALTER TABLE "announcements" DROP CONSTRAINT "announcements_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;