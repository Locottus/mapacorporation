import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('muestra el logotipo enlazado al inicio', () => {
    const logo = el.querySelector<HTMLAnchorElement>('a.logo');
    expect(logo?.getAttribute('href')).toBe('/');
    expect(logo?.querySelector('img')?.getAttribute('src')).toContain('30f4b3_15d9150129bb40ddb8d06fa212458c9f');
  });

  it('renderiza las 7 opciones del menu en orden', () => {
    const labels = Array.from(el.querySelectorAll('.menu a')).map((a) => a.textContent?.trim());
    expect(labels).toEqual([
      'Inicio',
      'Acerca de',
      'Servicios',
      'Ubicaciones',
      'Contacto',
      'Testimonios',
      'Descubre USA',
    ]);
  });

  it('abre y cierra el menu movil', async () => {
    const toggle = el.querySelector<HTMLButtonElement>('.menu-toggle')!;
    toggle.click();
    await fixture.whenStable();
    expect(el.querySelector('#mobile-menu')).toBeTruthy();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');

    el.querySelector<HTMLAnchorElement>('#mobile-menu a')!.click();
    await fixture.whenStable();
    expect(el.querySelector('#mobile-menu')).toBeNull();
  });
});
