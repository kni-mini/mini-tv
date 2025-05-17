CREATE TYPE "public"."media_type" AS ENUM('image', 'gif', 'video');--> statement-breakpoint
ALTER TABLE "organizations" RENAME COLUMN "image_id" TO "media_id";--> statement-breakpoint
ALTER TABLE "posters" RENAME COLUMN "image_id" TO "media_id";--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "posters" DROP CONSTRAINT "posters_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "announcements" ADD COLUMN "media_id" integer;--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "type" "media_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_media_id_images_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_media_id_images_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posters" ADD CONSTRAINT "posters_media_id_images_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;