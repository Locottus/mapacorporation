import { TestBed } from '@angular/core/testing';
import { Schedule } from './schedule';

describe('Schedule', () => {
  it('muestra el horario de atencion', async () => {
    await TestBed.configureTestingModule({ imports: [Schedule] }).compileComponents();
    const fixture = TestBed.createComponent(Schedule);
    await fixture.whenStable();
    const img = (fixture.nativeElement as HTMLElement).querySelector('img')!;
    expect(img.alt).toContain('Horario de atención');
  });
});
