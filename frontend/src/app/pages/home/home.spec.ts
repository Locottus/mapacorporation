import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Home], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(Home);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('presenta los servicios y las acciones principales con enlaces existentes', () => {
    expect(el.querySelector('h1')?.textContent).toContain('MAPA');
    expect(el.querySelector('.hero-portrait')).toBeNull();
    expect(el.querySelector('.hero-copy .lead')?.textContent).toContain('claridad');
    expect(el.querySelector('.hero-image')?.getAttribute('src')).toContain('new-york-skyline.jpg');
    expect(el.querySelectorAll('.more-reviews .review-card')).toHaveLength(7);
    expect(el.querySelectorAll('.service-card a[href="/services-9"]')).toHaveLength(3);
    expect(el.querySelectorAll('.service-card').length).toBe(3);
    expect(el.querySelector('a[href="/contact-4"]')?.textContent).toContain('Solicita orientación');
    expect(el.querySelector('a[href="/services-9"]')?.textContent).toContain('Conoce los servicios');
    expect(el.querySelectorAll('.review-card')).toHaveLength(10);
    expect(el.textContent).toContain('Andrea López, Mixco');
    expect(el.textContent).toContain('Ricardo y Melany Pérez, Jutiapa');
    expect(el.querySelector('a[href="/testimonios"]')?.textContent).toContain('Ver testimonios en video');
  });
});
