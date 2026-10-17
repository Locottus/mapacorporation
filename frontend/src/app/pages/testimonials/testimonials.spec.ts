import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Video } from '../../core/video';
import { Testimonials } from './testimonials';

const video = (id: string, title: string): Video => ({
  id,
  channel: 'testimonios',
  title,
  description: '',
  durationSec: 30,
  duration: '00:30',
  poster: `/media/img/${id}.jpg`,
  categories: [],
  tags: [],
  src: null,
  youtubeUrl: null,
});

describe('Testimonials', () => {
  let fixture: ComponentFixture<Testimonials>;
  let http: HttpTestingController;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonials],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(Testimonials);
    http = TestBed.inject(HttpTestingController);
    el = fixture.nativeElement;
    fixture.detectChanges();
    http.expectOne('/api/channels/testimonios').flush({
      id: 'testimonios',
      title: 'Testimonios de nuestros clientes',
      originalUrl: 'https://www.mapacorporation.com/testimonios',
      categories: [],
      total: 2,
    });
    http.expectOne((r) => r.url === '/api/videos' && r.params.get('channel') === 'testimonios').flush([
      video('a', 'Primer testimonio'),
      video('b', 'Segundo testimonio'),
    ]);
    await fixture.whenStable();
  });

  afterEach(() => http.verify());

  it('muestra el primer video con el boton Play Video', () => {
    expect(el.querySelector('.video-title')?.textContent).toContain('Primer testimonio');
    expect(el.querySelector('.play')?.textContent).toContain('Play Video');
    expect(el.querySelectorAll('.item').length).toBe(2);
  });

  it('filtra por busqueda', async () => {
    fixture.componentInstance.query.set('segundo');
    await fixture.whenStable();
    expect(el.querySelectorAll('.item').length).toBe(1);
  });

  it('al elegir un video lo reproduce y marca Now Playing', async () => {
    (el.querySelectorAll<HTMLButtonElement>('.item')[1]).click();
    await fixture.whenStable();
    expect(el.querySelector('app-video-player')).toBeTruthy();
    expect(el.querySelector('.now')?.textContent).toContain('Now Playing');
  });
});
