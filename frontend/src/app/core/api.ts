import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Channel, ContactMessage, ContactResponse, Video } from './video';

export interface VideoQuery {
  channel?: string;
  category?: string;
  q?: string;
}

@Injectable({ providedIn: 'root' })
export class Api {
  private readonly http = inject(HttpClient);
  private readonly base = '/api';

  getChannel(id: string): Observable<Channel> {
    return this.http.get<Channel>(`${this.base}/channels/${encodeURIComponent(id)}`);
  }

  getVideos(query: VideoQuery = {}): Observable<Video[]> {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(query)) {
      if (value) {
        params = params.set(key, value);
      }
    }
    return this.http.get<Video[]>(`${this.base}/videos`, { params });
  }

  sendContact(message: ContactMessage): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.base}/contact`, message);
  }
}
