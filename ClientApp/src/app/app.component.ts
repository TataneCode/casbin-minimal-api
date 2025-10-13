import { Component, signal } from '@angular/core';
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
  styleUrls: ['./app.component.scss']
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

  toggleSidebar() {
    this.showSidebar.update(v => !v);
  }
  closeSidebar() {
    this.showSidebar.set(false);
  }
}
