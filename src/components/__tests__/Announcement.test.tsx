import { render, screen } from '@testing-library/react';
import Announcement, { AnnouncementProps } from '@/components/Announcement';
import Media, {MediaProps} from "@/components/Media";
import { sampleMedia } from '@/sampleData';
import React from 'react';
import '@testing-library/jest-dom';


describe('Announcement', () => {
  const announcementTestProps: AnnouncementProps = {
    id: 1,
    name: 'Test Announcement',
    message: 'Test announcement message.',
    userId: 1,
    startDate: new Date(),
    createdAt: new Date(),
  }; 
  const imageTestProps = sampleMedia.find(m => m.mediaType === 'image')!;
  const videoTestProps = sampleMedia.find(m => m.mediaType === 'video')!;
  const gifTestProps = sampleMedia.find(m => m.mediaType === 'gif')!;

  it('renders image media', () => {
    render(<Announcement {...announcementTestProps} mediaId={imageTestProps.id} />);

    expect(screen.getByText('Test Announcement')).toBeInTheDocument();
    expect(screen.getByAltText(imageTestProps.alt || 'Announcement image')).toBeInTheDocument();
  });

  it('renders video media', () => {
    render(<Announcement {...announcementTestProps} mediaId={videoTestProps.id} />);

    expect(screen.getByText('Test Announcement')).toBeInTheDocument();
    expect(screen.getByLabelText(videoTestProps.alt || 'Announcement video')).toBeInTheDocument();
  });

  it('renders gif media', () => {
    render(<Announcement {...announcementTestProps} mediaId={gifTestProps.id} />);

    expect(screen.getByText('Test Announcement')).toBeInTheDocument();
    expect(screen.getByAltText(gifTestProps.alt || 'Announcement gif')).toBeInTheDocument();
  });

  it('truncates message when over maxMessLength', () => {
    const maxMessLengthTest = 10;
    const expectedTruncatedMessage = 'a'.repeat(maxMessLengthTest) + "...";
    render(
      <Announcement
        {...announcementTestProps}
        message={'a'.repeat(200)}
        maxMessLength={maxMessLengthTest}
      />
    );
    expect(screen.getByText(expectedTruncatedMessage)).toBeInTheDocument();
  });

  it('does not render announcement if startDate is later', () => {
    render(
      <Announcement
        {...announcementTestProps}
        startDate={new Date(Date.now() + 100000)}
      />
    );
    expect(screen.queryByText('Test Announcement')).not.toBeInTheDocument();
  });

  it('does not render announcement if after deletedAt', () => {
    render(
      <Announcement
        {...announcementTestProps}
        deletedAt={new Date(Date.now() - 1000)}
      />
    );
    expect(screen.queryByText('Test Announcement')).not.toBeInTheDocument();
  });
});


