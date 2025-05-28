"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema/users';
import { announcements } from '@/lib/db/schema/announcements';
import { medias } from '@/lib/db/schema/medias';

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
    let startDateRaw = formData.get("startDate");
    let endDateRaw = formData.get("endDate");

    let startDate: Date | null = startDateRaw ? new Date(startDateRaw as string) : null;
    let endDate: Date | null = endDateRaw ? new Date(endDateRaw as string) : null;
 
    const parse = clubAnnouncementSchema.safeParse({name, message});

    if (!parse.success) 
    {
        return state = {success: false, message: "Invalid form submission"};
    }

    if (!startDate)
    {
        startDate = new Date();
    }
    if (startDate && endDate && endDate < startDate) 
    {
        return { success: false, message: "The end date cannot be before the start date" };
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

            const insertedMedia = await db.insert(medias)
                .values({ file: base64Media, name: media.name, type: mediaType })
                .returning({ id: medias.id });

            mediaId = insertedMedia[0]?.id;
        }
        const organizationId = 1; // todo
        const groupId = null;     // todo

        await db.insert(announcements).values({
                name,
                message,
                mediaId: mediaId,
                organizationId,
                groupId,
                startDate,
                endDate,
                });

        revalidatePath("/admin/dashboard/student-club-announcement");
        return state = { success: true, message: "Successfully created a club announcement" };
    }
    catch (e: any) 
    {
        console.error("Database Error:", e);
       return state = { success: false, message: "Failed to create a student club announcement"};
    }
  }
