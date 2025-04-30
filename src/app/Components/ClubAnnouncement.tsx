import Image from "next/image";

interface AnnouncementCardProps {
  title: string;
  body: string;
  clubName: string;
  logoSrc?: string;
  mediaSrc?: string;
  mediaType?: "image" | "gif" | "video";
}

export default function ClubAnnouncement({ 
    title, 
    body,
    clubName,
    logoSrc = "/student_club_logos/shitemoji.png",
    mediaSrc,
    mediaType}
    : AnnouncementCardProps) {
    body = body.length > 300 ? body.slice(0, 300) + "..." : body; // max chars

    return (
      <div className="w-full max-w-4xl min-h-[200px] grid grid-rows-[60px_80px_1fr] bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
      
            {/* Row 1: Club Logo */}
            <div className="flex items-center justify-start px-8 py-4 my-4 bg-white">
            <Image src={logoSrc} width={32} height={32} className="rounded-full" alt="Club Logo" />
            <p>{clubName}</p>
            </div>

            {/* Row 2: Title */}
            <div className="flex items-center px-8 py-4">
            <h2 className="text-3xl font-bold text-indigo-700 text-left">{title}</h2>
            </div>

            {/* Row 3: Body */}
            <div className="px-8 py-6 text-gray-700 dark:text-gray-300 text-left overflow-auto">
            <p>{body}</p>
            </div>

            {/* OPTIONAL MEDIA*/}
            {mediaSrc && (
                <div className="mt-4 rounded-lg overflow-hidden">
                {mediaType === "image" || mediaType === "gif" ? (
                    <Image
                    src={mediaSrc}
                    alt="Announcement Media"
                    width={200}
                    height={100}
                    unoptimized
                    className="px-50 w-full h-auto object-contain rounded"
                    />
                ) : mediaType === "video" ? (
                    <video controls className="w-full h-auto rounded-lg">
                    <source src={mediaSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                ) : null}
                </div>
            )}
        </div>
    );
  }