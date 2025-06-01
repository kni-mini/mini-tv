// Mock for ClubAnnouncementForm page
import React, { useState } from 'react';

const ClubAnnouncementForm = () => {
  const [showPreview, setShowPreview] = useState(false);

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

  return (
    <div>
      <h1 className="text-2xl font-bold mx-auto text-indigo-700 mb-4">Create Club Announcement</h1>

      <label htmlFor="title">Title:</label>
      <input id="title" type="text" />

      <label htmlFor="message">Message:</label>
      <textarea id="message" />

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
    </div>
  );
};

export default ClubAnnouncementForm;
