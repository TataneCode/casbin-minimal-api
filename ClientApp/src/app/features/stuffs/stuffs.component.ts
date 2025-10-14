import type { OnInit } from '@angular/core';
import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StuffStore } from '@stores';
import { stuffsText } from './stuffs.component.text';
import { EntityCardComponent } from '../../shared/components/entity-card/entity-card.component';

interface StuffCardModel {
  name: string;
  description: string;
  neighborId: number;
}

@Component({
  selector: 'app-stuffs',
  standalone: true,
  imports: [CommonModule, EntityCardComponent],
  templateUrl: './stuffs.component.html',
  styleUrls: ['./stuffs.component.scss'],
  providers: [StuffStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StuffsComponent implements OnInit {
  readonly store = inject(StuffStore);
  readonly text = stuffsText;

  readonly stuffs = computed(() => this.store.stuffs());
  readonly loading = computed(() => this.store.loading());
  readonly error = computed(() => this.store.error());
  readonly stuffCards = computed<StuffCardModel[]>(() => this.stuffs().map(s => ({
    name: s.name,
    description: s.description,
    neighborId: s.neighborId,
  })));

  ngOnInit(): void {
    this.store.loadStuffs();
  }
}
