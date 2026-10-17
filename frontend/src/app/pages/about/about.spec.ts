import { TestBed } from '@angular/core/testing';
import { About } from './about';

describe('About', () => {
  it('renderiza las tres franjas con sus imagenes', async () => {
    await TestBed.configureTestingModule({ imports: [About] }).compileComponents();
    const fixture = TestBed.createComponent(About);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('section.strip').length).toBe(3);
    expect(el.querySelectorAll('img.abs').length).toBe(4);
    expect(el.querySelector('h1')?.textContent).toContain('Acerca de');
  });
});
