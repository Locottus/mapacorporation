import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Contact } from './contact';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let http: HttpTestingController;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(Contact);
    http = TestBed.inject(HttpTestingController);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  afterEach(() => http.verify());

  it('tiene los campos del formulario original', () => {
    for (const id of ['nombre', 'apellido', 'telefono', 'email', 'mensaje']) {
      expect(el.querySelector(`#${id}`)).toBeTruthy();
    }
    expect(el.querySelector('a[href^="tel:"]')).toBeTruthy();
    expect(el.querySelector('a[href^="mailto:"]')).toBeTruthy();
  });

  it('no envia si el email es invalido', () => {
    fixture.componentInstance.form.setValue({ nombre: 'A', apellido: 'B', telefono: '', email: 'malo', mensaje: '' });
    fixture.componentInstance.submit();
    http.expectNone('/api/contact');
  });

  it('envia y muestra el mensaje de agradecimiento', async () => {
    const value = { nombre: 'Ana', apellido: 'Paz', telefono: '555', email: 'ana@test.com', mensaje: 'Hola' };
    fixture.componentInstance.form.setValue(value);
    fixture.componentInstance.submit();
    const req = http.expectOne('/api/contact');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(value);
    req.flush({ ok: true, id: '1', message: '¡Gracias por tu mensaje!' });
    await fixture.whenStable();
    expect(el.querySelector('.feedback')?.textContent).toContain('¡Gracias por tu mensaje!');
  });

  it('muestra error si falla el backend', async () => {
    fixture.componentInstance.form.setValue({ nombre: '', apellido: '', telefono: '', email: 'a@b.co', mensaje: '' });
    fixture.componentInstance.submit();
    http.expectOne('/api/contact').flush({ ok: false }, { status: 500, statusText: 'err' });
    await fixture.whenStable();
    expect(el.querySelector('.feedback.error')).toBeTruthy();
  });
});
