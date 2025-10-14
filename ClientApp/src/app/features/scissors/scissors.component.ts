import { Component, ChangeDetectionStrategy } from '@angular/core';

// Scissors feature component
@Component({
  selector: 'app-scissors',
  standalone: true,
  templateUrl: './scissors.component.html',
  styleUrls: ['./scissors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScissorsComponent {}
