import '@test-setup';
import { describe, it, expect, beforeEach } from 'vitest';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NeighborClient } from '@clients';

import { NeighborsComponent } from './neighbors.component';

describe('NeighborsComponent', () => {
  let component: NeighborsComponent;
  let fixture: ComponentFixture<NeighborsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeighborsComponent],
      providers: [
        { provide: NeighborClient, useValue: { getAll: () => of([]) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading and paragraph', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Neighbors');
    expect(compiled.querySelector('p')?.textContent).toContain('neighbor');
  });
});
