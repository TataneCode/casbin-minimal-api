import '@test-setup';
import { describe, it, expect, beforeEach } from 'vitest';
import type { ComponentFixture } from '@angular/core/testing';

import { AuthenticationComponent } from './authentication.component';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading and paragraph', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Authentication');
    expect(compiled.querySelector('p')?.textContent).toContain('sign in');
  });
});
