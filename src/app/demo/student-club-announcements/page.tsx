"use client"

import ClubAnnouncement from "@/components/ClubAnnouncement";

export default function Announcement(){
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6">

      <ClubAnnouncement
        title="MiNI Hackathon!!!"
        body="WRS is organizing a hackathon! Join with your friends to get fun experience with snack supplies!
        More details coming soon. Bring your creativity and team spirit!"
        clubName="WRS MiNI">
      </ClubAnnouncement>

      <ClubAnnouncement
        title="MiNI Bridgerton Ball!!!"
        body="Step into the enchanting world of the Regency era at the WRS Bridgerton Ball!

            Join us for an unforgettable evening of elegance, dance, and romance inspired by the beloved Bridgerton series. Dress to impress in your finest regency-inspired attire — think flowing gowns, sharp suits, delicate gloves, and sparkling tiaras.

            Guests will be welcomed with live classical music, grand ballroom dances, and an ambiance straight out of Lady Whistledown’s finest gossip columns.

            Throughout the evening, enjoy exquisite refreshments, engage in lively conversations, and partake in traditional games and entertainments of the era. Capture beautiful memories at our themed photo corners, and perhaps — if fate allows — find your perfect dance partner.

            Don't miss your chance to experience a night of splendor, sophistication, and scandalous fun!

            ✨ Let the season's most anticipated social event begin! ✨"
          clubName="WRS MiNI"
          mediaSrc="/media/Rick Roll (Different link + no ads).mp4"
          mediaType="video">
      </ClubAnnouncement>

      <ClubAnnouncement
        title="MiNI Hackathon!!!"
        body="KNI IT is organizing a hackathon! Join with your friends to get fun experience with snack supplies!
        More details coming soon. Bring your creativity and team spirit!"
        clubName="KNI IT MiNI"
        mediaSrc="/media/buckspendragon-stan-twt.gif"
        mediaType="gif">
      </ClubAnnouncement>
      
    </div>
    
  );
}