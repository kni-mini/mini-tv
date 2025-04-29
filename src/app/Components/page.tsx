import Image from "next/image";

export default function Announcement(){
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6">
      <div className="w-full max-w-4xl min-h-[200px] grid grid-rows-[60px_80px_1fr] bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">

        {/* Row 1: Club Logo */}
        <div className="flex items-center justify-start px-8 py-4 my-4 bg-white">
          <Image src="/student_club_logos/shitemoji.png" width={32} height={32} className="rounded-full" alt="Club Logo" />
        </div>

        {/* Row 2: Title */}
        <div className="flex items-center px-8 py-4">
          <h2 className="text-3xl font-bold text-indigo-700 text-left">MiNI Hackathon!!!</h2>
        </div>

        {/* Row 3: Body */}
        <div className="px-8 py-6 text-gray-700 dark:text-gray-300 text-left overflow-auto">
          <p>WRS is organizing a hackathon! Join with your friends to get fun experience with snack supplies!</p>
          <p className="mt-4">More details coming soon. Bring your creativity and team spirit!</p>
        </div>

      </div>
      <div className="w-full max-w-4xl min-h-[200px] grid grid-rows-[60px_80px_1fr] bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">

        {/* Row 1: Club Logo */}
        <div className="flex items-center justify-start px-8 py-4 my-4 bg-white">
          <Image src="/student_club_logos/shitemoji.png" width={32} height={32} className="rounded-full" alt="Club Logo" />
        </div>

        {/* Row 2: Title */}
        <div className="flex items-center px-8 py-4">
          <h2 className="text-3xl font-bold text-indigo-700 text-left">MiNI Bridgeton Ball!!!</h2>
        </div>

        {/* Row 3: Body */}
        <div className="px-8 py-6 text-gray-700 dark:text-gray-300 text-left overflow-auto">
          <p>Step into the enchanting world of the Regency era at the WRS Bridgerton Ball!

            Join us for an unforgettable evening of elegance, dance, and romance inspired by the beloved Bridgerton series. Dress to impress in your finest regency-inspired attire — think flowing gowns, sharp suits, delicate gloves, and sparkling tiaras.

            Guests will be welcomed with live classical music, grand ballroom dances, and an ambiance straight out of Lady Whistledown’s finest gossip columns.

            Throughout the evening, enjoy exquisite refreshments, engage in lively conversations, and partake in traditional games and entertainments of the era. Capture beautiful memories at our themed photo corners, and perhaps — if fate allows — find your perfect dance partner.

            Don't miss your chance to experience a night of splendor, sophistication, and scandalous fun!

            ✨ Let the season's most anticipated social event begin! ✨

            </p>
          
        </div>

      </div>
      <div className="w-full max-w-4xl min-h-[200px] grid grid-rows-[60px_80px_1fr] bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">

        {/* Row 1: Club Logo */}
        <div className="flex items-center justify-start px-8 py-4 my-4 bg-white">
          <Image src="/student_club_logos/shitemoji.png" width={32} height={32} className="rounded-full" alt="Club Logo" />
        </div>

        {/* Row 2: Title */}
        <div className="flex items-center px-8 py-4">
          <h2 className="text-3xl font-bold text-indigo-700 text-left">MiNI Hackathon!!!</h2>
        </div>

        {/* Row 3: Body */}
        <div className="px-8 py-6 text-gray-700 dark:text-gray-300 text-left overflow-auto">
          <p>WRS is organizing a hackathon! Join with your friends to get fun experience with snack supplies!</p>
          <p className="mt-4">More details coming soon. Bring your creativity and team spirit!</p>
        </div>

      </div>
    </div>
    
  );
}