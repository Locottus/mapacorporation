import { Component, DOCUMENT, HostListener, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';

/** Ancho del lienzo de diseño del sitio original (Wix). */
export const STAGE_WIDTH = 980;

export function computeScale(viewportWidth: number): number {
  if (!viewportWidth || viewportWidth >= STAGE_WIDTH) {
    return 1;
  }
  return Math.round((viewportWidth / STAGE_WIDTH) * 1000) / 1000;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.updateScale();
  }

  @HostListener('window:resize')
  updateScale(): void {
    const width = this.document.documentElement.clientWidth || this.document.defaultView?.innerWidth || 0;
    this.document.documentElement.style.setProperty('--scale', String(computeScale(width)));
  }
}
