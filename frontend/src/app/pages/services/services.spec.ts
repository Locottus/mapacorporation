import { TestBed } from '@angular/core/testing';
import { Services } from './services';

describe('Services', () => {
  it('muestra las cinco tarjetas de servicio', async () => {
    await TestBed.configureTestingModule({ imports: [Services] }).compileComponents();
    const fixture = TestBed.createComponent(Services);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('section.strip').length).toBe(5);
    expect(el.querySelectorAll('img.card').length).toBe(5);
  });
});
