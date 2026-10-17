import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';

export function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds || 0));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function loadCatalog(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function toDto(video, mediaDir) {
  const localFile = path.join(mediaDir, 'video', `${video.id}.mp4`);
  return {
    ...video,
    duration: formatDuration(video.durationSec),
    poster: `/media/img/${video.poster}`,
    src: fs.existsSync(localFile) ? `/media/video/${video.id}.mp4` : null,
  };
}

export function createVideoRouter({ videosFile, mediaDir }) {
  const router = Router();

  router.get('/channels/:id', (req, res) => {
    const catalog = loadCatalog(videosFile);
    const channel = catalog.channels[req.params.id];
    if (!channel) {
      return res.status(404).json({ error: 'Canal no encontrado' });
    }
    const videos = catalog.videos.filter((v) => v.channel === channel.id);
    const categories = [...new Set(videos.flatMap((v) => v.categories))];
    res.json({ ...channel, categories, total: videos.length });
  });

  router.get('/videos', (req, res) => {
    const { channel, category, q } = req.query;
    const term = typeof q === 'string' ? q.trim().toLowerCase() : '';
    const videos = loadCatalog(videosFile)
      .videos.filter((v) => !channel || v.channel === channel)
      .filter((v) => !category || v.categories.includes(category))
      .filter((v) => !term || `${v.title} ${v.description}`.toLowerCase().includes(term))
      .map((v) => toDto(v, mediaDir));
    res.json(videos);
  });

  router.get('/videos/:id', (req, res) => {
    const video = loadCatalog(videosFile).videos.find((v) => v.id === req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }
    res.json(toDto(video, mediaDir));
  });

  return router;
}
