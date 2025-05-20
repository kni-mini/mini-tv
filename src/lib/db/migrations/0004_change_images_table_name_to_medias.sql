ALTER TABLE "images" RENAME TO "medias";--> statement-breakpoint
ALTER TABLE "announcements" DROP CONSTRAINT "announcements_media_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_media_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "posters" DROP CONSTRAINT "posters_media_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_media_id_medias_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."medias"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_media_id_medias_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."medias"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posters" ADD CONSTRAINT "posters_media_id_medias_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."medias"("id") ON DELETE no action ON UPDATE no action;