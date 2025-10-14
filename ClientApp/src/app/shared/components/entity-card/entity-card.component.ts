import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-entity-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityCardComponent {
  @Input() title = '';
  @Input() subtitle: string | null = null;
  @Input() imageUrl: string | null = null;
  @Input() imageAlt: string | null = null;
  @Input() hasFooter = false;
  @Input() fallbackIcon = 'fa-user';
}
