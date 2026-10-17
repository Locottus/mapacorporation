import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video, youtubeEmbedUrl } from '../../core/video';

export type PlayMode = 'mp4' | 'youtube' | 'external';

/** Decide como reproducir: MP4 local > YouTube > enlace al sitio original. */
export function playMode(video: Pick<Video, 'src' | 'youtubeUrl'>): PlayMode {
  if (video.src) {
    return 'mp4';
  }
  return youtubeEmbedUrl(video.youtubeUrl) ? 'youtube' : 'external';
}

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.html',
  styleUrl: './video-player.css',
})
export class VideoPlayer {
  private readonly sanitizer = inject(DomSanitizer);

  readonly video = input.required<Video>();
  readonly originalUrl = input<string>('https://www.mapacorporation.com/');

  protected readonly mode = computed(() => playMode(this.video()));

  protected readonly embed = computed<SafeResourceUrl | null>(() => {
    // youtubeEmbedUrl solo devuelve URLs youtube-nocookie con un id validado.
    const url = youtubeEmbedUrl(this.video().youtubeUrl);
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });
}
