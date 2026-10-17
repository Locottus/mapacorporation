import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App, computeScale } from './app';
import { MENU, routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  it('crea la aplicacion con encabezado, contenido y pie', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-header')).toBeTruthy();
    expect(el.querySelector('main router-outlet')).toBeTruthy();
    expect(el.querySelector('app-footer')).toBeTruthy();
  });

  it('define la variable --scale', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect(document.documentElement.style.getPropertyValue('--scale')).not.toBe('');
  });
});

describe('computeScale', () => {
  it('no escala en escritorio', () => {
    expect(computeScale(1280)).toBe(1);
    expect(computeScale(0)).toBe(1);
  });

  it('reduce proporcionalmente en pantallas angostas', () => {
    expect(computeScale(490)).toBe(0.5);
  });
});

describe('routes', () => {
  it('conserva las URLs y titulos del sitio original', () => {
    expect(MENU.map((m) => m.path)).toEqual([
      '/',
      '/about-3',
      '/services-9',
      '/ubicaciónes',
      '/contact-4',
      '/testimonios',
      '/copia-de-contacto',
    ]);
    expect(routes[0].title).toBe('INICIO | MAPA ASESORIAS MIGRATORIAS');
    expect(routes.find((r) => r.path === 'copia-de-contacto')?.title).toBe(
      'Descubre USA | MAPA ASESORIAS MIGRATORIAS',
    );
  });
});
