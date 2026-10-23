import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Api } from '../../core/api';
import { Channel, Video } from '../../core/video';
import { VideoPlayer } from '../../shared/video-player/video-player';

export const TESTIMONIALS_CHANNEL = 'testimonios';

@Component({
  selector: 'app-testimonials',
  imports: [VideoPlayer],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnInit {
  private readonly api = inject(Api);

  readonly channel = signal<Channel | null>(null);
  readonly videos = signal<Video[]>([]);
  readonly query = signal('');
  readonly selectedId = signal<string | null>(null);
  readonly playing = signal(false);
  readonly error = signal(false);
  readonly loaded = signal(false);

  readonly selected = computed(() => {
    const list = this.videos();
    return list.find((v) => v.id === this.selectedId()) ?? list[0] ?? null;
  });

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const list = this.videos();
    return q ? list.filter((v) => `${v.title} ${v.description}`.toLowerCase().includes(q)) : list;
  });

  ngOnInit(): void {
    this.api.getChannel(TESTIMONIALS_CHANNEL).subscribe({
      next: (c) => this.channel.set(c),
      error: () => this.error.set(true),
    });
    this.api.getVideos({ channel: TESTIMONIALS_CHANNEL }).subscribe({
      next: (v) => {
        this.videos.set(v);
        this.loaded.set(true);
      },
      error: () => {
        this.error.set(true);
        this.loaded.set(true);
      },
    });
  }

  select(video: Video): void {
    this.selectedId.set(video.id);
    this.playing.set(true);
  }

  play(): void {
    this.playing.set(true);
  }

  onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
}
