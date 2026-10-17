import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { formatDuration } from '../src/routes/videos.js';

let tmp;
let app;

before(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mapa-'));
  fs.mkdirSync(path.join(tmp, 'media', 'video'), { recursive: true });
  fs.writeFileSync(path.join(tmp, 'media', 'video', '30f4b3_53367de428c2493e8b6f731c1abd84f5.mp4'), '');
  app = createApp({
    messagesFile: path.join(tmp, 'messages.json'),
    mediaDir: path.join(tmp, 'media'),
    staticDir: path.join(tmp, 'no-dist'),
  });
});

after(() => fs.rmSync(tmp, { recursive: true, force: true }));

test('formatDuration', () => {
  assert.equal(formatDuration(93), '01:33');
  assert.equal(formatDuration(8), '00:08');
});

test('GET /api/health', async () => {
  const res = await request(app).get('/api/health');
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { status: 'ok' });
});

test('GET /api/videos filtra por canal', async () => {
  const res = await request(app).get('/api/videos?channel=descubre-usa');
  assert.equal(res.status, 200);
  assert.equal(res.body.length, 13);
  assert.equal(res.body[0].title, 'visas y migración legal');
  assert.equal(res.body[0].duration, '00:57');
  assert.match(res.body[0].poster, /^\/media\/img\//);
});

test('GET /api/videos marca src cuando existe el MP4 local', async () => {
  const res = await request(app).get('/api/videos?channel=descubre-usa');
  const miami = res.body.find((v) => v.title === 'Miami Vibes');
  assert.equal(miami.src, '/media/video/30f4b3_53367de428c2493e8b6f731c1abd84f5.mp4');
  assert.equal(res.body[0].src, null);
});

test('GET /api/videos busca por texto y categoria', async () => {
  const q = await request(app).get('/api/videos').query({ channel: 'descubre-usa', q: 'miami' });
  assert.deepEqual(q.body.map((v) => v.title), ['Miami Vibes', 'El viaje de tus sueños']);
  const c = await request(app).get('/api/videos').query({ category: 'Testimonios' });
  assert.equal(c.body.length, 1);
});

test('GET /api/channels/:id', async () => {
  const res = await request(app).get('/api/channels/testimonios');
  assert.equal(res.body.title, 'Testimonios de nuestros clientes');
  assert.deepEqual(res.body.categories, ['Testimonios']);
  assert.equal((await request(app).get('/api/channels/x')).status, 404);
});

test('POST /api/contact valida email obligatorio', async () => {
  const res = await request(app).post('/api/contact').send({ nombre: 'Ana' });
  assert.equal(res.status, 400);
  assert.ok(res.body.fields.email);
});

test('POST /api/contact guarda el mensaje', async () => {
  const res = await request(app)
    .post('/api/contact')
    .send({ nombre: 'Ana', apellido: 'López', telefono: '+502 5715 2797', email: 'ana@test.com', mensaje: 'Hola' });
  assert.equal(res.status, 201);
  const saved = JSON.parse(fs.readFileSync(path.join(tmp, 'messages.json'), 'utf8'));
  assert.equal(saved.length, 1);
  assert.equal(saved[0].email, 'ana@test.com');
});

test('POST /api/contact rechaza JSON invalido', async () => {
  const res = await request(app).post('/api/contact').set('Content-Type', 'application/json').send('{x');
  assert.equal(res.status, 400);
});

test('API desconocida responde 404', async () => {
  assert.equal((await request(app).get('/api/nada')).status, 404);
});
