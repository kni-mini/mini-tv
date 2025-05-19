"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";
import ClubAnnouncement from "@/Components/ClubAnnouncement"
import type {AnnouncementCardProps} from "@/Components/ClubAnnouncement"

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

const clubAnnouncementSchema = z.object({
    name: z.string().min(1),
    message: z.string().min(1),
});

export async function createClubAnnouncement(formData: FormData) {
 
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const media = formData.get("media") as File | null;
    const icon = formData.get("icon") as File | null;
 

    const parse = clubAnnouncementSchema.safeParse({name, message});

    let media_url = null;
    let icon_url = null;

    if (!parse.success) {
        throw new Error("Invalid form submission");
    }

   /*
   // Add new announcement to database
   try {
        await sql`
        INSERT INTO announcements (name, message, media_url, icon_url)
        VALUES (${name}, ${message}, ${media_url}, ${icon_url})
        `;

        revalidatePath("/admin/dashboard/student-club-announcement");
        //return { message: `Added todo ${data.todo}` };
    } catch (e) {
        throw new Error("Failed to create a student club announcement");
    }*/
    const newAnnouncementProps : AnnouncementCardProps = {
        title:name, 
        body:message, 
        clubName:name, 
        mediaSrc:undefined, 
        logoSrc:undefined, 
        mediaType:undefined};

    const newAnnouncement = ClubAnnouncement ({...newAnnouncementProps});
  }
