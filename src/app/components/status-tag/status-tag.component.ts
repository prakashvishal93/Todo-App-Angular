import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { StatusEnum } from '../../enums';

@Component({
  selector: 'app-status-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-tag.component.html',
  styleUrl: './status-tag.component.scss',
})
export class StatusTagComponent {
  @Input({ required: true }) status: StatusEnum | undefined;

  get statusTextColor(): string {
    switch (this.status) {
      case StatusEnum.TODO:
        return 'text-blue-800';
      case StatusEnum.IN_PROGRESS:
        return 'text-orange-700';
      case StatusEnum.COMPLETED:
        return 'text-green-700';
      default:
        return 'black';
    }
  }

  get statusBackgroundColor(): string {
    switch (this.status) {
      case StatusEnum.TODO:
        return 'bg-blue-100';
      case StatusEnum.IN_PROGRESS:
        return 'bg-orange-100';
      case StatusEnum.COMPLETED:
        return 'bg-green-100';
      default:
        return 'bg-white';
    }
  }
}
