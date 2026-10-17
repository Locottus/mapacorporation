import { youtubeEmbedUrl, youtubeId } from './video';

describe('youtubeId', () => {
  it('reconoce los formatos habituales de YouTube', () => {
    expect(youtubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(youtubeId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(youtubeId('https://youtube.com/shorts/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(youtubeId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('rechaza enlaces que no son de YouTube o invalidos', () => {
    expect(youtubeId(null)).toBeNull();
    expect(youtubeId('no es url')).toBeNull();
    expect(youtubeId('https://evil.com/watch?v=dQw4w9WgXcQ')).toBeNull();
    expect(youtubeId('https://youtu.be/<script>')).toBeNull();
  });

  it('genera la URL de inserción sin cookies', () => {
    expect(youtubeEmbedUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(
      'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0',
    );
  });
});
