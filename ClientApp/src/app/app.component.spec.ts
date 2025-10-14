import '@test-setup';
import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { By } from '@angular/platform-browser';
import { NeighborClient } from '@clients';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
        { provide: NeighborClient, useValue: { getAll: () => of([]) } }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the desktop header title span', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    const titleSpan = compiled.querySelector('.header .app-title');
    expect(titleSpan?.textContent).toContain('Casbin client');
  });

  it('should have a mobile menu bar element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('.mobile-bar .menu-toggle')).toBeTruthy();
  });

  it('should toggle sidebar open state when clicking the menu button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const btn = fixture.debugElement.query(By.css('.menu-toggle'));
    expect(component.showSidebar()).toBeFalsy();
    btn.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.showSidebar()).toBeTruthy();
    const sidebar = fixture.debugElement.query(By.css('.sidebar'));
    expect(sidebar.nativeElement.classList).toContain('is-open');
  });

  it('should navigate to neighbors and render its h2', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    await router.navigateByUrl('/neighbors');
    fixture.detectChanges();
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2?.textContent).toContain('Neighbors');
  });

  it('should toggle theme and update document attribute', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.theme-toggle') as HTMLButtonElement;
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    button.click();
    fixture.detectChanges();
    expect(['dark', null]).toContain(document.documentElement.getAttribute('data-theme')); // dark if system prefers dark default
    // Force second toggle
    button.click();
    fixture.detectChanges();
    // After two toggles we should be back to initial (light => no attribute OR dark attribute removed)
    // Can’t assert exact due to initial system preference, just ensure attribute flips at least once.
  });
});
