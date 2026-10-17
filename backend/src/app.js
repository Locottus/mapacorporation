import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createVideoRouter } from './routes/videos.js';
import { createContactRouter } from './routes/contact.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

export const defaults = {
  videosFile: path.join(root, 'data', 'videos.json'),
  messagesFile: path.join(root, 'data', 'messages.json'),
  mediaDir: path.resolve(root, '..', 'frontend', 'public', 'media'),
  staticDir: path.resolve(root, '..', 'frontend', 'dist', 'frontend', 'browser'),
};

export function createApp(options = {}) {
  const config = { ...defaults, ...options };
  const app = express();

  app.disable('x-powered-by');
  app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
  app.use(express.json({ limit: '50kb' }));

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api', createVideoRouter(config));
  app.use('/api', createContactRouter(config));
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Recurso no encontrado' }));

  // Videos MP4 locales exportados desde Wix (opcional) y demas medios.
  app.use('/media', express.static(config.mediaDir, { maxAge: '7d' }));

  if (fs.existsSync(path.join(config.staticDir, 'index.html'))) {
    app.use(express.static(config.staticDir, { index: false }));
    app.get(/^(?!\/api\/).*/, (_req, res) => res.sendFile(path.join(config.staticDir, 'index.html')));
  }

  app.use((err, _req, res, _next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'JSON invalido' });
    }
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });

  return app;
}
