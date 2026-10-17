import { TestBed } from '@angular/core/testing';
import { Locations } from './locations';

describe('Locations', () => {
  it('muestra las cuatro oficinas', async () => {
    await TestBed.configureTestingModule({ imports: [Locations] }).compileComponents();
    const fixture = TestBed.createComponent(Locations);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('section.strip').length).toBe(3);
    expect(el.querySelectorAll('img.office').length).toBe(4);
  });
});
