'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import type { AnnouncementCardProps } from '@/components/ClubAnnouncement';
import ClubAnnouncement from '@/components/ClubAnnouncement';
import { createClubAnnouncement } from '@/app/(main)/admin/student-club-announcement/actions';
import { ANNOUNCEMENT_MAX_MESSAGE_LENGTH } from '@/app/constants';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="p-2 shadow border rounded-xl mx-auto w-full bg-indigo-700 text-white"
    >
      Create
    </button>
  );
}

export default function ClubAnnouncementForm() {
  const [tab, setTab] = useState<'form' | 'preview'>('form');
  const initialState = { success: false, message: '' };
  const [state, formAction] = useActionState(createClubAnnouncement, initialState);

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [, setStartDate] = useState<Date | null>(null);
  const [, setEndDate] = useState<Date | null>(null);

  const handleTabChange = (tabName: 'form' | 'preview') => {
    setTab(tabName);
  };

  const previewProps: AnnouncementCardProps = {
    title: name,
    body: message,
    clubName: 'Test Club Name',
    mediaSrc: mediaFile ? URL.createObjectURL(mediaFile) : undefined,
    logoSrc: iconFile ? URL.createObjectURL(iconFile) : undefined,
    mediaType: mediaFile ? 'image' : undefined,
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-evenly max-w-3xl mb-4 mx-auto gap-2">
        <button
          onClick={() => handleTabChange('form')}
          className={`p-2 rounded w-full ${tab === 'form' ? 'bg-indigo-700 text-white' : 'bg-gray-600 text-white'}`}
        >
          Form
        </button>
        <button
          onClick={() => handleTabChange('preview')}
          className={`p-2 rounded w-full ${tab === 'preview' ? 'bg-indigo-700 text-white' : 'bg-gray-600 text-white'}`}
        >
          Preview
        </button>
      </div>
      <div className={tab === 'form' ? '' : 'hidden'}>
        <form
          action={formAction}
          className="flex flex-col shadow-xl gap-4 max-w-3xl mx-auto p-6 bg-white rounded-xl"
        >
          <h1 className="text-2xl font-bold mx-auto text-indigo-700 mb-4">
            Create Club Announcement
          </h1>
          {state.message && (
            <div className={`mb-4 p-2 rounded ${state.success ? 'bg-green-600' : 'bg-red-600'}`}>
              <p className={'text-sm text-white'}>{state.message}</p>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              name="name"
              id="name"
              type="text"
              required
              className="shadow border rounded w-full p-2 text-gray-700"
              placeholder="Announcement Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Message:
            </label>
            <textarea
              name="message"
              id="message"
              rows={6}
              required
              className="shadow border rounded w-full p-2 text-gray-700"
              placeholder="Announcement Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {message.length > ANNOUNCEMENT_MAX_MESSAGE_LENGTH && (
            <div className="mb-4 p-2 rounded bg-red-400">
              <p className={'text-sm text-white'}>
                NOTE: The message is longer than {ANNOUNCEMENT_MAX_MESSAGE_LENGTH} characters, it
                will be truncated.
              </p>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="media" className="block text-gray-700 text-sm font-bold mb-2">
              Media (optional):
            </label>
            <input
              name="media"
              id="media"
              type="file"
              accept="image/*,video/*,gif/*"
              className="shadow border rounded w-full p-2 text-gray-700"
              placeholder="Announcement Media"
              onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="icon" className="block text-gray-700 text-sm font-bold mb-2">
              Icon Image (optional):
            </label>
            <input
              name="icon"
              id="icon"
              type="file"
              accept="image/*"
              className="shadow border rounded w-full p-2 text-gray-700"
              placeholder="Announcement Icon"
              onChange={(e) => setIconFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
              Start Date (optional):
            </label>
            <input
              name="startDate"
              id="startDate"
              type="date"
              className="shadow border rounded w-full p-2 text-gray-700"
              placeholder="Announcement Start Date"
              onChange={(e) => setStartDate(e.target.valueAsDate || null)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
              End Date (optional):
            </label>
            <input
              name="endDate"
              id="endDate"
              type="date"
              className="shadow border rounded w-full p-2 text-gray-700"
              placeholder="Announcement End Date"
              onChange={(e) => setEndDate(e.target.valueAsDate || null)}
            />
          </div>

          <SubmitButton />
        </form>
      </div>
      <div className={tab === 'preview' ? '' : 'hidden'}>
        <ClubAnnouncement {...previewProps} />
      </div>
    </div>
  );
}
