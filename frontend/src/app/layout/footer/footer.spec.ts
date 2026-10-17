import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Footer] }).compileComponents();
    fixture = TestBed.createComponent(Footer);
    await fixture.whenStable();
  });

  it('muestra el texto legal del sitio original', () => {
    const text = (fixture.nativeElement as HTMLElement).querySelector('h2')?.textContent ?? '';
    expect(text).toContain('© 2025 MAPA Asesorías Migratorias | Empresa líder en procesos migratorios.');
    expect(text).toContain('Todos los derechos reservados.');
  });
});
