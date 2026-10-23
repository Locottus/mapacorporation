import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Footer } from './footer';

describe('Footer', () => {
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Footer], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(Footer);
    await fixture.whenStable();
  });

  it('muestra los enlaces de contacto y el aviso de alcance del servicio', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('a[href^="tel:"]')).toBeTruthy();
    expect(el.querySelector('a[href^="mailto:"]')).toBeTruthy();
    expect(el.textContent).toContain('no garantiza resultados migratorios');
    expect(el.textContent).toContain('Todos los derechos reservados.');
  });
});
