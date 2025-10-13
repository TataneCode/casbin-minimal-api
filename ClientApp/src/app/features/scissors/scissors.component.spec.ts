import '@test-setup';
import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScissorsComponent } from './scissors.component';

describe('ScissorsComponent', () => {
  let component: ScissorsComponent;
  let fixture: ComponentFixture<ScissorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScissorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScissorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading and paragraph', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Scissors');
    expect(compiled.querySelector('p')?.textContent).toContain('Tools');
  });
});
