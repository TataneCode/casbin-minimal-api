import '@test-setup';
import { describe, it, expect, beforeEach } from 'vitest';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ScissorsComponent } from './scissors.component';
import { NeighborClient, StuffClient } from '@clients';
import type { NeighborResponse, StuffDto } from '@models';

describe('ScissorsComponent', () => {
  let component: ScissorsComponent;
  let fixture: ComponentFixture<ScissorsComponent>;

  beforeEach(async () => {
    const neighbors: NeighborResponse[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', address: { street: '1 Main', city: 'Paris', zipCode: '75000' } },
      { id: 2, name: 'Bob', email: 'bob@example.com', address: { street: '2 Side', city: 'Lyon', zipCode: '69000' } }
    ];
    const stuffs: StuffDto[] = [
      { id: 10, name: 'Hammer', description: 'Heavy duty', neighborId: 1 },
      { id: 11, name: 'Saw', description: 'Sharp', neighborId: 1 },
      { id: 12, name: 'Wrench', description: 'Adjustable', neighborId: 2 }
    ];

    await TestBed.configureTestingModule({
      imports: [ScissorsComponent],
      providers: [
        { provide: NeighborClient, useValue: { getAll: () => of(neighbors) } },
        { provide: StuffClient, useValue: { getAll: () => of(stuffs) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScissorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render new heading', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Neighbors & Stuffs Explorer');
  });

  it('should list neighbors in tree', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const nodes = compiled.querySelectorAll('.neighbor-node');
    expect(nodes.length).toBe(2);
  });

  it('should expand a neighbor to show stuffs', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const toggleBtn = compiled.querySelector('.neighbor-node .toggle') as HTMLButtonElement;
    toggleBtn.click();
    fixture.detectChanges();
    const stuffs = compiled.querySelectorAll('.stuff-item');
    expect(stuffs.length).toBeGreaterThan(0);
  });
});
