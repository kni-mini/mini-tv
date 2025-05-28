import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClubAnnouncement from '../ClubAnnouncement';

describe('ClubAnnouncement', () => {
  it('renders the title and body', () => {
    render(
      <ClubAnnouncement
        title="Test Event"
        body="This is a test announcement."
        clubName="Some club"
      />
    );

    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('This is a test announcement.')).toBeInTheDocument();
  });

  it('shows truncated body if maxChars is set', () => {
    const longText =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

    render(<ClubAnnouncement title="Short" body={longText} clubName="PW" />);

    // Since maxLen is 300, we expect the text to be truncated at 300 chars + "..."
    const expectedText = longText.slice(0, 300) + '...';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('renders media if provided', () => {
    render(
      <ClubAnnouncement
        title="With Media"
        body="Test"
        clubName="Media Club"
        mediaSrc="/student_club_logos/shitemoji.png"
        mediaType="image"
      />
    );

    expect(screen.getByAltText('Announcement Media')).toBeInTheDocument();
  });
  it("renders a video when mediaType is 'video'", () => {
    const { container } = render(
      <ClubAnnouncement
        title="Video Test"
        body="Watch this announcement!"
        clubName="Film Club"
        mediaSrc="/media/Rick Roll (Different link + no ads).mp4"
        mediaType="video"
      />
    );

    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
  });
});
