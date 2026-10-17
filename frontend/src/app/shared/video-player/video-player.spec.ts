import { TestBed } from '@angular/core/testing';
import { Video } from '../../core/video';
import { VideoPlayer, playMode } from './video-player';

const base: Video = {
  id: 'abc',
  channel: 'testimonios',
  title: 'Video',
  description: '',
  durationSec: 10,
  duration: '00:10',
  poster: '/media/img/p.jpg',
  categories: [],
  tags: [],
  src: null,
  youtubeUrl: null,
};

async function render(video: Video): Promise<HTMLElement> {
  await TestBed.configureTestingModule({ imports: [VideoPlayer] }).compileComponents();
  const fixture = TestBed.createComponent(VideoPlayer);
  fixture.componentRef.setInput('video', video);
  fixture.componentRef.setInput('originalUrl', 'https://example.com/original');
  await fixture.whenStable();
  return fixture.nativeElement;
}

describe('playMode', () => {
  it('prioriza MP4, luego YouTube, luego enlace externo', () => {
    expect(playMode({ src: '/media/video/a.mp4', youtubeUrl: 'https://youtu.be/dQw4w9WgXcQ' })).toBe('mp4');
    expect(playMode({ src: null, youtubeUrl: 'https://youtu.be/dQw4w9WgXcQ' })).toBe('youtube');
    expect(playMode({ src: null, youtubeUrl: 'https://evil.example/x' })).toBe('external');
    expect(playMode({ src: null, youtubeUrl: null })).toBe('external');
  });
});

describe('VideoPlayer', () => {
  it('usa <video> cuando hay MP4 local', async () => {
    const el = await render({ ...base, src: '/media/video/abc.mp4' });
    expect(el.querySelector('video')?.getAttribute('src')).toBe('/media/video/abc.mp4');
  });

  it('incrusta YouTube cuando hay enlace', async () => {
    const el = await render({ ...base, youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
    expect(el.querySelector('iframe')?.getAttribute('src')).toContain('youtube-nocookie.com/embed/dQw4w9WgXcQ');
  });

  it('enlaza al sitio original si no hay fuente', async () => {
    const el = await render(base);
    expect(el.querySelector('a')?.getAttribute('href')).toBe('https://example.com/original');
  });
});
