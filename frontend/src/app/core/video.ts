export interface Video {
  id: string;
  channel: string;
  title: string;
  description: string;
  durationSec: number;
  duration: string;
  poster: string;
  categories: string[];
  tags: string[];
  /** MP4 local servido por el backend (null si no se ha exportado). */
  src: string | null;
  /** Enlace de YouTube opcional configurado en backend/data/videos.json. */
  youtubeUrl: string | null;
}

export interface Channel {
  id: string;
  title: string;
  originalUrl: string;
  categories: string[];
  total: number;
}

export interface ContactMessage {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  mensaje: string;
}

export interface ContactResponse {
  ok: boolean;
  id: string;
  message: string;
}

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

/** Extrae el id de un enlace de YouTube (watch, youtu.be, shorts o embed). */
export function youtubeId(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, '');
    let id: string | null = null;
    if (host === 'youtu.be') {
      id = u.pathname.slice(1);
    } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      id = u.searchParams.get('v') ?? u.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ?? null;
    }
    return id && YOUTUBE_ID.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function youtubeEmbedUrl(url: string | null | undefined): string | null {
  const id = youtubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : null;
}
