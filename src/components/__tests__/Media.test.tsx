import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Media, {MediaProps} from "@/Components/Media";
import '@testing-library/jest-dom';


describe("Media", () => {
  it("displays error message for unsupported media type", () => {
    const now = new Date();
    const unsupportedMediaType = "pdf";
    render(
      <Media
        id={1}
        name="Announcement with unsupported media type"
        file="/media/test.pdf"
        createdAt={now}
        mediaType={unsupportedMediaType}
        alt="Unsupported media"
      />
    );
    expect(screen.getByText(new RegExp(`Unsupported media type: ${unsupportedMediaType}$`, 'i'))).toBeInTheDocument();
  });

  it('displays message if media is deleted already', () => {
    const deletedMedia: MediaProps = {
      id: 999,
      file: '/deleted.png',
      mediaType: 'image',
      createdAt: new Date(),
      deleteAt: new Date(),
      alt: 'Deleted image',
    };
  
    render(<Media {...deletedMedia} />);
  
    expect(screen.getByText(/This media has been deleted/i)).toBeInTheDocument();
  });

});