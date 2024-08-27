import { Component, Input } from '@angular/core';
import { PriorityEnum } from '../../enums';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-priority-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './priority-tag.component.html',
  styleUrl: './priority-tag.component.scss',
})
export class PriorityTagComponent {
  @Input({ required: true }) priority: PriorityEnum | undefined;

  get statusTextColor(): string {
    switch (this.priority) {
      case PriorityEnum.LOW:
        return 'text-blue-700';
      case PriorityEnum.MEDIUM:
        return 'text-yellow-700';
      case PriorityEnum.HIGH:
        return 'text-red-700';
      default:
        return 'black';
    }
  }

  get statusBackgroundColor(): string {
    switch (this.priority) {
      case PriorityEnum.LOW:
        return 'bg-blue-100';
      case PriorityEnum.MEDIUM:
        return 'bg-yellow-100';
      case PriorityEnum.HIGH:
        return 'bg-red-100';
      default:
        return 'bg-white';
    }
  }
}
