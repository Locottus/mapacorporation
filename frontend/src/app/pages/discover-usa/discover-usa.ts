import { Component, ElementRef, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { Api } from '../../core/api';
import { Channel, Video } from '../../core/video';
import { Schedule } from '../../shared/schedule/schedule';
import { VideoPlayer } from '../../shared/video-player/video-player';

export const USA_CHANNEL = 'descubre-usa';
export const ALL = 'All Categories';

@Component({
  selector: 'app-discover-usa',
  imports: [VideoPlayer, Schedule],
  templateUrl: './discover-usa.html',
  styleUrl: './discover-usa.css',
  host: { '(document:keydown.escape)': 'close()' },
})
export class DiscoverUsa implements OnInit {
  private readonly api = inject(Api);
  private readonly track = viewChild<ElementRef<HTMLElement>>('track');

  readonly channel = signal<Channel | null>(null);
  readonly videos = signal<Video[]>([]);
  readonly category = signal(ALL);
  readonly active = signal<Video | null>(null);
  readonly error = signal(false);
  readonly loaded = signal(false);

  readonly categories = computed(() => [ALL, ...(this.channel()?.categories ?? [])]);

  readonly filtered = computed(() => {
    const cat = this.category();
    const list = this.videos();
    return cat === ALL ? list : list.filter((v) => v.categories.includes(cat));
  });

  ngOnInit(): void {
    this.api.getChannel(USA_CHANNEL).subscribe({
      next: (c) => this.channel.set(c),
      error: () => this.error.set(true),
    });
    this.api.getVideos({ channel: USA_CHANNEL }).subscribe({
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

  onCategory(event: Event): void {
    this.category.set((event.target as HTMLSelectElement).value);
    this.track()?.nativeElement.scrollTo({ left: 0 });
  }

  scroll(direction: 1 | -1): void {
    const el = this.track()?.nativeElement;
    el?.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  }

  open(video: Video): void {
    this.active.set(video);
  }

  close(): void {
    this.active.set(null);
  }
}
