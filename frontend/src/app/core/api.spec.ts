import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Api } from './api';

describe('Api', () => {
  let service: Api;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Api);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('pide los videos de un canal omitiendo filtros vacios', () => {
    service.getVideos({ channel: 'descubre-usa', category: '' }).subscribe((v) => expect(v).toEqual([]));
    const req = http.expectOne((r) => r.url === '/api/videos');
    expect(req.request.params.get('channel')).toBe('descubre-usa');
    expect(req.request.params.has('category')).toBe(false);
    req.flush([]);
  });

  it('obtiene la informacion del canal', () => {
    service.getChannel('testimonios').subscribe((c) => expect(c.title).toBe('T'));
    http.expectOne('/api/channels/testimonios').flush({ title: 'T' });
  });

  it('envia el formulario de contacto por POST', () => {
    const msg = { nombre: 'A', apellido: 'B', telefono: '', email: 'a@b.com', mensaje: '' };
    service.sendContact(msg).subscribe((r) => expect(r.ok).toBe(true));
    const req = http.expectOne('/api/contact');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(msg);
    req.flush({ ok: true, id: '1', message: 'ok' });
  });
});
