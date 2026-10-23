import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Video } from '../../core/video';
import { DiscoverUsa } from './discover-usa';

const video = (id: string, categories: string[]): Video => ({
  id,
  channel: 'descubre-usa',
  title: `Video ${id}`,
  description: `Descripcion ${id}`,
  durationSec: 60,
  duration: '01:00',
  poster: `/media/img/${id}.jpg`,
  categories,
  tags: [],
  src: null,
  youtubeUrl: null,
});

describe('DiscoverUsa', () => {
  let fixture: ComponentFixture<DiscoverUsa>;
  let http: HttpTestingController;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverUsa],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(DiscoverUsa);
    http = TestBed.inject(HttpTestingController);
    el = fixture.nativeElement;
    fixture.detectChanges();
    http.expectOne('/api/channels/descubre-usa').flush({
      id: 'descubre-usa',
      title: 'Descubramos USA',
      originalUrl: 'https://www.mapacorporation.com/descubre-usa',
      categories: ['Estados Unidos'],
      total: 2,
    });
    http.expectOne((r) => r.url === '/api/videos').flush([video('a', ['Estados Unidos']), video('b', [])]);
    await fixture.whenStable();
  });

  afterEach(() => http.verify());

  it('muestra el carrusel y las categorias', () => {
    expect(el.querySelector('h1')?.textContent).toContain('Descubramos USA');
    expect(el.querySelectorAll('.resource-card').length).toBe(2);
    const options = Array.from(el.querySelectorAll('option')).map((o) => o.textContent?.trim());
    expect(options).toEqual(['Todas las categorías', 'Estados Unidos']);
  });

  it('filtra por categoria', async () => {
    fixture.componentInstance.category.set('Estados Unidos');
    await fixture.whenStable();
    expect(el.querySelectorAll('.resource-card').length).toBe(1);
  });

  it('abre y cierra el reproductor modal', async () => {
    el.querySelector<HTMLButtonElement>('.resource-thumb')!.click();
    await fixture.whenStable();
    expect(el.querySelector('.modal app-video-player')).toBeTruthy();
    el.querySelector<HTMLButtonElement>('.close-button')!.click();
    await fixture.whenStable();
    expect(el.querySelector('.modal')).toBeNull();
  });
});
