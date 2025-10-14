import type { Routes } from '@angular/router';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { NeighborsComponent } from './features/neighbors/neighbors.component';
import { ScissorsComponent } from './features/scissors/scissors.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'authentication' },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'neighbors', component: NeighborsComponent },
  { path: 'scissors', component: ScissorsComponent },
];
