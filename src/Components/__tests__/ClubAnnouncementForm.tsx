import React from 'react';
import { createClubAnnouncement } from '@/app/(main)/admin/student-club-announcement/actions';
import { db } from '@/lib/db';
import { medias } from '@/lib/db/schema/medias';
import ClubAnnouncementForm from "@/app/(main)/admin/student-club-announcement/ClubAnnouncementForm";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {ANNOUNCEMENT_MAX_MESSAGE_LENGTH} from '@/app/constants'

describe('ClubAnnouncementForm', () => {

    it("renders form fields", () => {
    render(<ClubAnnouncementForm />);
    expect(screen.getByLabelText(/Title:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Media/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Icon/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/)).toBeInTheDocument();
  });

  it("changes from/to form and preview", async() => {
    render(<ClubAnnouncementForm />);
    fireEvent.click(screen.getByText("Preview"));
    expect(screen.getByText("Create Club Announcement")).not.toBeInTheDocument(); 
    fireEvent.click(screen.getByText("Form"));
    expect(screen.getByText("Create Club Announcement")).toBeInTheDocument();
  });

  it("displays a warning on long message", async () => {
    render(<ClubAnnouncementForm />);
    const textarea = screen.getByLabelText(/Message:/);
    fireEvent.change(textarea, {target: { value: "a".repeat(ANNOUNCEMENT_MAX_MESSAGE_LENGTH + 10) },});
    expect(await screen.findByText(/longer than/)).toBeInTheDocument();
  });

  it("submittes form with valid data", async() => {
    (createClubAnnouncement as any).mockImplementation(() =>
        Promise.resolve({ success: true, message: "Mock created" })
    );

    render(<ClubAnnouncementForm/>);
    const message = screen.getByLabelText(/Message:/);
    const title = screen.getByLabelText(/Title:/);
    fireEvent.change(message, {target: {value: "Message of the club announcement"},});
    fireEvent.change(title, {target: {value: "Club Announcement Title"}});

    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(screen.getByText("Mock created")).toBeInTheDocument();
    });

  });


});