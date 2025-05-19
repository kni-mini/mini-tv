'use client';

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {createClubAnnouncement} from "@/app/admin/dashboard/student-club-announcement/actions"

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} className="shadow border rounded-xl mx-auto w-full bg-black text-white">
      Create
    </button>
  );
}

export default function ClubAnnouncementForm() {

    

    return (
    <form action={createClubAnnouncement} className="flex flex-col gap-4 max-w-xl mx-auto p-6 bg-white rounded-xl">
        <h1 className="text-2xl font-bold mx-auto text-gray-900 mb-4">Create Club Announcement</h1>
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Title:
            </label>
            <input name="name" id="name" type="text" required 
            className="shadow border rounded w-full p-2 text-gray-700" placeholder="Announcement Title"/>
        </div>
        <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                Message:
            </label>
            <textarea name="message" id="message" rows={6} required 
            className="shadow border rounded w-full p-2 text-gray-700" placeholder="Announcement Message"/>
        </div>
        <div className="mb-4">
            <label htmlFor="media" className="block text-gray-700 text-sm font-bold mb-2">
                Media (optional):
            </label>
            <input name="media" id="media" type="file" accept="image/*,video/*,gif/*" 
            className="shadow border rounded w-full p-2 text-gray-700" placeholder="Announcement Media"/>
        </div>
        <div className="mb-4">
            <label htmlFor="icon" className="block text-gray-700 text-sm font-bold mb-2">
                Icon Image (optional):
            </label>
            <input name="icon" id="icon" type="file" accept="image/*"
            className="shadow border rounded w-full p-2 text-gray-700" placeholder="Announcement Icon"/>
        </div>

      <SubmitButton/>

    </form>
  );
}