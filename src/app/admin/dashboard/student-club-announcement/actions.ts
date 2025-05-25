"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";
import ClubAnnouncement from "@/Components/ClubAnnouncement"
import type {AnnouncementCardProps} from "@/Components/ClubAnnouncement"
import { Medula_One } from "next/font/google";

const sql = postgres({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DB || 'postgres',
  ssl: false,
});

const clubAnnouncementSchema = z.object({
    name: z.string().min(1),
    message: z.string().min(1),
});

function checkMediaType(media: File): "image" | "gif" | "video" | "unsupported"
{
    const mediaType = media.type;
    if (mediaType.startsWith("image/"))
    {
        if (mediaType == "image/gif")
        {
            return "gif";
        }
        return "image";
    }
    else if (mediaType.startsWith("video/"))
    {
        return "video";
    }
    
    return "unsupported";
}


export async function createClubAnnouncement(state: { success: boolean; message: string; }, formData: FormData) {
 
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const media = formData.get("media") as File | null;
    const icon = formData.get("icon") as File | null;
 
    const parse = clubAnnouncementSchema.safeParse({name, message});

    if (!parse.success) 
    {
        return state = {success: false, message: "Invalid form submission"};
    }

     let mediaId: number | null = null;

    try {
        if (media && media.size > 0) 
        {
            const arrayBuffer = await media.arrayBuffer();
            const base64Media = Buffer.from(arrayBuffer).toString("base64");
            const mediaType = checkMediaType(media); 
            if (mediaType == "unsupported")
            {
                return state = { success: false, message: "This media type is unsupported. Only images, GIFs, and videos are allowed"};
            }
            // deleted at

            const [insertedMedia] = await sql`
                INSERT INTO medias (file, name, type)
                VALUES (${base64Media}, ${media.name}, ${mediaType})
                RETURNING id
            `;

            mediaId = insertedMedia.id;
        }
        const organizationId = 1; // todo
        const groupId = null;     // todo

        await sql`
            INSERT INTO announcements (name, message, media_id, organization_id, group_id)
            VALUES (${name}, ${message}, ${mediaId}, ${organizationId}, ${groupId})
            `;

        revalidatePath("/admin/dashboard/student-club-announcement");
        return state = { success: true, message: "Successfully created a club announcement" };
    }
    catch (e: any) 
    {
        console.error("DB Error:", e);
       return state = { success: false, message: "Failed to create a student club announcement"};
    }
  }
