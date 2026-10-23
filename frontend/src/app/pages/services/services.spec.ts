import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Services } from './services';

describe('Services', () => {
  it('muestra los cuatro servicios y permite consultar cada uno', async () => {
    await TestBed.configureTestingModule({ imports: [Services], providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(Services);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('.service-card').length).toBe(4);
    expect(el.querySelectorAll('a[href="/contact-4"]').length).toBe(5);
    expect(el.textContent).toContain('Preparación para entrevistas consulares');
  });
});
