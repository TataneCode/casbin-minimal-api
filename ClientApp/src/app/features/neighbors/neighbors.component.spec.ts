import '@test-setup';
import { describe, it, expect, beforeEach } from 'vitest';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NeighborClient } from '@clients';
import type { NeighborResponse } from '@models';

import { NeighborsComponent } from './neighbors.component';

describe('NeighborsComponent', () => {
  let component: NeighborsComponent;
  let fixture: ComponentFixture<NeighborsComponent>;

  beforeEach(async () => {
    const sample: NeighborResponse[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', address: { street: '1 Main', city: 'Paris', zipCode: '75000' } },
      { id: 2, name: 'Bob', email: 'bob@example.com', address: { street: '2 Side', city: 'Lyon', zipCode: '69000' } },
    ];
    await TestBed.configureTestingModule({
      imports: [NeighborsComponent],
      providers: [
        { provide: NeighborClient, useValue: { getAll: () => of(sample) } }
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

  it('should render cards for neighbors', () => {
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('app-entity-card'));
    expect(cards.length).toBe(2);
  });
});
