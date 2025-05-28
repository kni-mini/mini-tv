import React from 'react';
import ClubAnnouncementForm from '@/Components/ClubAnnouncementForm';
import { render, screen, fireEvent } from '@testing-library/react';
import { ANNOUNCEMENT_MAX_MESSAGE_LENGTH } from '@/app/constants';

describe('ClubAnnouncementForm', () => {
  it('renders form fields', () => {
    render(<ClubAnnouncementForm />);
    expect(screen.getByLabelText(/Title:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Media/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Icon/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/)).toBeInTheDocument();
  });

  it('changes from/to form and preview', async () => {
    render(<ClubAnnouncementForm />);

    // Initially on form tab
    expect(screen.getByText('Create Club Announcement')).toBeInTheDocument();

    // Switch to preview tab
    fireEvent.click(screen.getByText('Preview'));

    // Form should be hidden (check for hidden class)
    const formDiv = screen.getByText('Create Club Announcement').closest('div');
    expect(formDiv).toHaveClass('hidden');

    // Switch back to form tab
    fireEvent.click(screen.getByText('Form'));
    expect(screen.getByText('Create Club Announcement')).toBeInTheDocument();
    const formDivAfter = screen.getByText('Create Club Announcement').closest('div');
    expect(formDivAfter).not.toHaveClass('hidden');
  });

  it('displays a warning on long message', async () => {
    render(<ClubAnnouncementForm />);
    const textarea = screen.getByLabelText(/Message:/);
    fireEvent.change(textarea, {
      target: { value: 'a'.repeat(ANNOUNCEMENT_MAX_MESSAGE_LENGTH + 10) },
    });
    expect(await screen.findByText(/longer than/)).toBeInTheDocument();
  });

  it('form can be filled out with valid data', async () => {
    render(<ClubAnnouncementForm />);
    const message = screen.getByLabelText(/Message:/);
    const title = screen.getByLabelText(/Title:/);

    // Fill out the form
    fireEvent.change(message, { target: { value: 'Message of the club announcement' } });
    fireEvent.change(title, { target: { value: 'Club Announcement Title' } });

    // Check that values are set correctly
    expect(title).toHaveValue('Club Announcement Title');
    expect(message).toHaveValue('Message of the club announcement');

    // Check that submit button is present and not disabled
    const submitButton = screen.getByText('Create');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });
});
