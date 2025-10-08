import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatSidenavContainer,
  MatSidenav,
  MatSidenavContent
} from '@angular/material/sidenav';
import {MatButton, MatIconButton} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSlideToggle } from '@angular/material/slide-toggle';

import { appComponentText } from './app.component.text';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatButton,
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatSlideToggle
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text = appComponentText;
  darkMode = signal(false);

  // on récupère directement le checked envoyé par le mat-slide-toggle
  onThemeChange(checked: boolean) {
    this.darkMode.set(checked);
    document.body.classList.toggle('dark-theme', checked);
  }
}
