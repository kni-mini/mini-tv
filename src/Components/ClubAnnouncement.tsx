import Image from "next/image";

export interface  AnnouncementCardProps {
  title: string;
  body: string;
  clubName: string;
  logoSrc?: string;
  mediaSrc?: string;
  mediaType?: "image" | "gif" | "video";
}

const maxLen = 300

export default function ClubAnnouncement({ 
    title, 
    body,
    clubName,
    logoSrc = "/student_club_logos/shitemoji.png",
    mediaSrc,
    mediaType}
    : AnnouncementCardProps) {
    body = body.length > maxLen ? body.slice(0, maxLen) + "..." : body; // max chars

    return (
      <div className="w-full max-w-4xl min-h-[200px] grid grid-rows-[60px_80px_1fr] bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
      
            {/* Row 1: Club Logo */}
            <div className="flex items-center gap-2 px-8 py-4 my-4 bg-white">
            <Image src={logoSrc} width={32} height={32} className="rounded-full object-contain" alt="Club Logo" />
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
            <>
                {(mediaType === "image" || mediaType === "gif") && (
                <div className="relative w-full max-w-md h-[250px] mx-auto mt-4">
                    <Image
                    src={mediaSrc}
                    alt="Announcement Media"
                    fill
                    unoptimized
                    className="object-contain w-full h-auto rounded-lg"
                    />
                </div>
                )}

                {mediaType === "video" && (
                <div className="mt-4 rounded-lg overflow-hidden">
                    <video controls className="w-full h-auto rounded-lg">
                    <source src={mediaSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
                )}
            </>
            )}
        </div>
    );
  }