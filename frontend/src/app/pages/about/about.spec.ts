import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { About } from './about';

describe('About', () => {
  it('explica el acompañamiento y los límites del servicio', async () => {
    await TestBed.configureTestingModule({ imports: [About], providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(About);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h1')?.textContent).toContain('Orientación cercana');
    expect(el.querySelectorAll('.value-card').length).toBe(3);
    expect(el.textContent).toContain('resultados garantizados');
  });
});
