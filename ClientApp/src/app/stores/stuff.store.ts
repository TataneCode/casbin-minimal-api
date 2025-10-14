import { inject } from '@angular/core';
import { StuffClient } from '@clients';
import type { StuffDto } from '@models';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface StuffState {
  stuffs: StuffDto[];
  selected: StuffDto;
  loading: boolean;
  error: string | null;
}

export const baseStuff: StuffDto = {
  id: 0,
  name: '',
  description: '',
  neighborId: 0,
};

export const StuffStore = signalStore(
  withState<StuffState>({
    stuffs: [],
    selected: baseStuff,
    loading: false,
    error: null,
  }),
  withMethods((store, client = inject(StuffClient)) => ({
    loadStuffs() {
      patchState(store, { loading: true, error: null });
      client.getAll().subscribe({
        next: (data) => patchState(store, { stuffs: data, loading: false }),
        error: (err) => patchState(store, { error: err?.message || 'Failed to load stuffs', loading: false })
      });
    },
    select(stuff: StuffDto | null) {
      patchState(store, { selected: stuff ?? baseStuff });
    },
    resetSelected() { patchState(store, { selected: baseStuff }); }
  }))
);

