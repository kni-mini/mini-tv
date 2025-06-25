import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { announcements } from '@/lib/db/schema/announcements'

export async function POST(request: Request) {
  const { title, body, endDate } = await request.json()

  const [inserted] = await db
    .insert(announcements)
    .values({
      name:            title,                           // maps to "name"
      message:         body,                            // maps to "message"
      groupId:         null,                            // or some group id
      organizationId:  2,                               // must supply this (notNull)
      mediaId:         null,                            // or id of an uploaded media row
      startDate:       new Date(),                      // required
      endDate:         endDate ? new Date(endDate) : null, 
      // createdAt and deletedAt omitted → defaults will apply
    })
    .returning()  // ← makes Drizzle give you back the inserted row(s)

  return NextResponse.json({ inserted }, { status: 201 })
}
