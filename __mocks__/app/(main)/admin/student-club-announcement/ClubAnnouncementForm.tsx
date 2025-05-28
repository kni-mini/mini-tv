// Mock for ClubAnnouncementForm component
import React, { useState } from 'react';
import { createClubAnnouncement } from './actions';

const ANNOUNCEMENT_MAX_MESSAGE_LENGTH = 300;

const ClubAnnouncementForm = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  if (showPreview) {
    return (
      <div>
        <button type="button" onClick={() => setShowPreview(false)}>
          Form
        </button>
        <div>Preview mode</div>
      </div>
    );
  }

  const isMessageTooLong = message.length > ANNOUNCEMENT_MAX_MESSAGE_LENGTH;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createClubAnnouncement();
      if (result && typeof result === 'object' && 'message' in result) {
        setResultMessage(result.message);
      }
    } catch (error) {
      setResultMessage(`Error occurred ${error}`);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mx-auto text-indigo-700 mb-4">Create Club Announcement</h1>

      {resultMessage && <div>{resultMessage}</div>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="message">Message:</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
        {isMessageTooLong && <div>Message is longer than 300 characters</div>}

        <label htmlFor="media">Media</label>
        <input id="media" type="file" />

        <label htmlFor="icon">Icon</label>
        <input id="icon" type="file" />

        <label htmlFor="startDate">Start Date</label>
        <input id="startDate" type="date" />

        <label htmlFor="endDate">End Date</label>
        <input id="endDate" type="date" />

        <button type="button" onClick={() => setShowPreview(true)}>
          Preview
        </button>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ClubAnnouncementForm;
