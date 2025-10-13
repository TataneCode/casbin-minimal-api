import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeighborStore } from '@stores';
import { neighborsText } from './neighbors.component.text';

// Neighbors feature component
@Component({
  selector: 'app-neighbors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './neighbors.component.html',
  styleUrls: ['./neighbors.component.scss'],
  providers: [NeighborStore]
})
export class NeighborsComponent implements OnInit {
  readonly store = inject(NeighborStore);
  readonly text = neighborsText;

  // Component-level signals (template reads these, not the store directly)
  readonly neighbors = computed(() => this.store.neighbors());
  readonly loading = computed(() => this.store.loading());
  readonly error = computed(() => this.store.error());

  ngOnInit(): void {
    this.store.loadNeighbors();
  }
}
