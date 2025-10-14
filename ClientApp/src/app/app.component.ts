import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appComponentText } from './app.component.text';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // Centralized texts exposed directly
  readonly appComponentText = appComponentText;

  // Sidebar open state for mobile
  readonly showSidebar = signal(false);

  constructor() {
    // Explicit usage to avoid unused import warning
    if (!appComponentText.header.title) {
      console.warn('Header title missing');
    }
  }

  toggleSidebar(): void {
    this.showSidebar.update(v => !v);
  }
  closeSidebar(): void {
    this.showSidebar.set(false);
  }
}
