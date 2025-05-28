import Poster from '@/components/Poster';

const GifPage: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width:  '100vw',
        height: '91vh',
        background: '#000',
      }}
    >
      <Poster type="gif" src="/demo-media/sample.gif" alt="Sample animated GIF" loop />
    </div>
  );
};

export default GifPage;
