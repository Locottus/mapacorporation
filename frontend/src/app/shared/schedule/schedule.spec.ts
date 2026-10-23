import { TestBed } from '@angular/core/testing';
import { Schedule } from './schedule';

describe('Schedule', () => {
  it('muestra el horario de atencion', async () => {
    await TestBed.configureTestingModule({ imports: [Schedule] }).compileComponents();
    const fixture = TestBed.createComponent(Schedule);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('#schedule-title')?.textContent).toContain('Nuestro horario');
    expect(el.textContent).toContain('8:00 a 18:00');
    expect(el.textContent).toContain('8:00 a 13:00');
  });
});
