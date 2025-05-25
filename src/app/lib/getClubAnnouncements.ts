"use server";

import postgres from "postgres";

const sql = postgres({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DB || 'postgres',
  ssl: false,
});

export async function getClubAnnouncements() {
  let retries = 5;
  while (retries) {
    try {
      const result = await sql`
        SELECT 
          a.id,
          a.name,
          a.message,
          a.start_date,
          a.end_date,
          a.deleted_at,
          m.file AS media_file,
          m.type AS media_type
        FROM announcements a
        LEFT JOIN medias m ON a.media_id = m.id
        WHERE a.deleted_at IS NULL
          AND (a.start_date IS NULL OR a.start_date <= NOW())
          AND (a.end_date IS NULL OR a.end_date >= NOW())
        ORDER BY a.start_date DESC;
      `;
      return result.map(row => ({
        title: row.name,
        body: row.message,
        clubName: row.name,
        mediaSrc: row.media_file ? `/public/media/${row.media_file}` : undefined,
        mediaType: row.media_type ?? undefined,
      }));
    } 
    catch (err) 
    {
      console.error("Postgres query failed. Retrying...", err);
      retries--;
      if (retries === 0) throw err;
      await new Promise(res => setTimeout(res, 1000));
    }
  }
}