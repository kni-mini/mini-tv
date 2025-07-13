import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Announcement from '../Announcement';

describe('Announcement (Club variant)', () => {
  it('renders the title and body', () => {
    render(
      <Announcement
        title="Test Event"
        body="This is a test announcement."
        clubName="Some club"
        variant="club"
      />
    );

    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('This is a test announcement.')).toBeInTheDocument();
  });

  it('shows truncated body if maxChars is set', () => {
    const longText =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

    render(<Announcement title="Short" body={longText} clubName="PW" variant="club" />);

    // Since maxLen is 300, we expect the text to be truncated at 300 chars + "..."
    const expectedText = longText.slice(0, 300) + '...';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('renders media if provided', () => {
    render(
      <Announcement
        title="With Media"
        body="Test"
        clubName="Media Club"
        mediaSrc="/student_club_logos/shitemoji.png"
        mediaType="image"
        variant="club"
      />
    );

    expect(screen.getByAltText('Announcement Media')).toBeInTheDocument();
  });
  it("renders a video when mediaType is 'video'", () => {
    const { container } = render(
      <Announcement
        title="Video Test"
        body="Watch this announcement!"
        clubName="Film Club"
        mediaSrc="/media/Rick Roll (Different link + no ads).mp4"
        mediaType="video"
        variant="club"
      />
    );

    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
  });
});
