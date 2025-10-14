import type { OnInit } from '@angular/core';
import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeighborStore, StuffStore } from '@stores';
import { scissorsText } from './scissors.component.text';
import type { NeighborResponse } from '@models';

interface NeighborStuffNode {
  neighbor: NeighborResponse;
  stuffs: Array<{ id: number; name: string; description: string; neighborId: number }>;
}

@Component({
  selector: 'app-scissors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scissors.component.html',
  styleUrls: ['./scissors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NeighborStore, StuffStore]
})
export class ScissorsComponent implements OnInit {
  private readonly neighborStore = inject(NeighborStore);
  private readonly stuffStore = inject(StuffStore);
  readonly text = scissorsText;

  // Load states
  readonly loading = computed(() => this.neighborStore.loading() || this.stuffStore.loading());
  readonly error = computed(() => this.neighborStore.error() || this.stuffStore.error());

  // Combined tree structure
  readonly tree = computed<NeighborStuffNode[]>(() => {
    const neighbors = this.neighborStore.neighbors();
    const stuffs = this.stuffStore.stuffs();
    return neighbors.map(n => ({
      neighbor: n,
      stuffs: stuffs.filter(s => s.neighborId === n.id)
    }));
  });

  // Expansion state
  private readonly expandedIds = signal<Set<number>>(new Set());

  isExpanded(id: number): boolean { return this.expandedIds().has(id); }
  toggle(id: number): void {
    this.expandedIds.update(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }
  expandAll(): void { this.expandedIds.set(new Set(this.tree().map(n => n.neighbor.id))); }
  collapseAll(): void { this.expandedIds.set(new Set()); }

  ngOnInit(): void {
    this.neighborStore.loadNeighbors();
    this.stuffStore.loadStuffs();
  }
}
