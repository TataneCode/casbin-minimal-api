import '@test-setup';
import { describe, it, expect, beforeEach } from 'vitest';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StuffsComponent } from './stuffs.component';
import { StuffClient } from '@clients';
import type { StuffDto } from '@models';

describe('StuffsComponent', () => {
  let fixture: ComponentFixture<StuffsComponent>;
  let component: StuffsComponent;

  beforeEach(async () => {
    const sample: StuffDto[] = [
      { id: 1, name: 'Hammer', description: 'Heavy duty hammer', neighborId: 10 },
      { id: 2, name: 'Saw', description: 'Hand saw', neighborId: 11 },
    ];

    await TestBed.configureTestingModule({
      imports: [StuffsComponent],
      providers: [ { provide: StuffClient, useValue: { getAll: () => of(sample) } } ]
    }).compileComponents();

    fixture = TestBed.createComponent(StuffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h2')?.textContent).toContain('Stuffs');
  });

  it('should render cards', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('app-entity-card');
    expect(cards.length).toBe(2);
  });
});

