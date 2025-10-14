import { inject } from '@angular/core';
import { NeighborClient } from '@clients';
import type { NeighborResponse } from '@models';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface NeighborState {
  neighbors: NeighborResponse[];
  selected: NeighborResponse;
  loading: boolean;
  error: string | null;
}

export const baseNeighbor: NeighborResponse = {
  id: 0,
  name: '',
  email: '',
  address: { street: '', city: '', zipCode: '' }
};

export const NeighborStore = signalStore(
  withState<NeighborState>({
    neighbors: [],
    selected: baseNeighbor,
    loading: false,
    error: null,
  }),
  withMethods((store, neighborClient = inject(NeighborClient)) => ({
    loadNeighbors() {
      patchState(store, { loading: true, error: null });
      neighborClient.getAll().subscribe({
        next: (data) => {
          patchState(store, { neighbors: data, loading: false });
        },
        error: (err) => {
          patchState(store, {
            error: err?.message || 'Failed to load neighbors',
            loading: false,
          });
        },
      });
    },
    select(neighbor: NeighborResponse | null) {
      patchState(store, { selected: neighbor ?? baseNeighbor });
    },
    resetSelected() {
      patchState(store, { selected: baseNeighbor });
    },
  }))
);
