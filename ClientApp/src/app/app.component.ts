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
    readonly theme = signal<'light' | 'dark'>('light');

    constructor() {
    // Explicit usage to avoid unused import warning
        if (!appComponentText.header.title) {
            console.warn('Header title missing');
        }
        this.initTheme();
    }

    private initTheme(): void {
        try {
            const saved = localStorage.getItem('app-theme');
            if (saved === 'dark' || saved === 'light') {
                this.theme.set(saved);
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.theme.set('dark');
            }
        } catch { /* ignore */ }
        this.applyTheme();
    }

    private applyTheme(): void {
        const root = document.documentElement;
        if (this.theme() === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
    }

    toggleTheme(): void {
        this.theme.update(t => t === 'dark' ? 'light' : 'dark');
        try { localStorage.setItem('app-theme', this.theme()); } catch { /* ignore */ }
        this.applyTheme();
    }

    toggleSidebar(): void {
        this.showSidebar.update(v => !v);
    }
    closeSidebar(): void {
        this.showSidebar.set(false);
    }
}
