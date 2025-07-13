ALTER TABLE "posters" RENAME COLUMN "user_id" TO "creator_id";--> statement-breakpoint
ALTER TABLE "posters" DROP CONSTRAINT "posters_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "announcements" ADD COLUMN "creator_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posters" ADD CONSTRAINT "posters_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;