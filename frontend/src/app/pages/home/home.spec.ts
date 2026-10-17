import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Home] }).compileComponents();
    fixture = TestBed.createComponent(Home);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('tiene las tres franjas del sitio original', () => {
    expect(el.querySelectorAll('section.strip').length).toBe(3);
    expect(el.querySelector('h1')?.textContent).toContain('Expertos en procesos migratorios');
  });

  it('coloca las 10 opiniones en una cuadricula de 2 columnas', () => {
    const reviews = Array.from(el.querySelectorAll<HTMLImageElement>('img.review'));
    expect(reviews.length).toBe(10);
    expect(reviews[0].style.left).toBe('8px');
    expect(reviews[1].style.left).toBe('502px');
    expect(reviews[9].style.top).toBe('876px');
    expect(reviews[0].alt).toContain('Andrea López');
  });
});
