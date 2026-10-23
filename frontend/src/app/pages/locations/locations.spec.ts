import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Locations } from './locations';

describe('Locations', () => {
  it('muestra las ubicaciones publicadas y el horario', async () => {
    await TestBed.configureTestingModule({ imports: [Locations], providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(Locations);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('.location-card').length).toBe(4);
    expect(el.textContent).toContain('Ciudad de Guatemala');
    expect(el.textContent).toContain('Chiquimula');
    expect(el.textContent).toContain('Puerto Barrios');
    expect(el.textContent).toContain('Jalapa');
    expect(el.textContent).toContain('Lunes a viernes');
  });
});
