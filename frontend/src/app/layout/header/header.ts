import { Component, ElementRef, HostListener, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MENU } from '../../app.routes';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly menu = MENU;
  protected readonly open = signal(false);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  toggle(): void {
    this.open.update((v) => !v);
  }

  close(): void {
    this.open.set(false);
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    if (this.open()) {
      this.close();
      this.menuButton()?.nativeElement.focus();
    }
  }
}
