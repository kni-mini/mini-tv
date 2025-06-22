// app/api/announcements/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";           // your NextAuth config
import { db } from "@/lib/db";                      // your Drizzle client
import { announcements } from "@/lib/db/schema/announcements";        // your Drizzle table schema
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  // 1) check auth
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2) fetch only announcements by this user
  const rows = await db
    .select()
    .from(announcements)
    .where(eq(announcements.createdById, session.user.id))
    .orderBy(announcements.scheduledAt, "desc");

  // 3) return JSON
  return NextResponse.json(rows);
}
