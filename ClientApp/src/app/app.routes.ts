import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({ standalone: true, template: '<h2>Accueil</h2>' })
export class HomeComponent {}

@Component({ standalone: true, template: '<h2>Voisins</h2>' })
export class NeighborsComponent {}

@Component({ standalone: true, template: '<h2>Matériel</h2>' })
export class StuffsComponent {}

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'neighbors', component: NeighborsComponent },
  { path: 'stuffs', component: StuffsComponent },
];
