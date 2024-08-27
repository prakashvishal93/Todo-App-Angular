import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TimelineModule } from 'primeng/timeline';

import { TaskHistoryInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-line-modal',
  standalone: true,
  imports: [DialogModule, CommonModule, TimelineModule, ButtonModule],
  templateUrl: './time-line-modal.component.html',
  styleUrl: './time-line-modal.component.scss',
})
export class TimeLineModalComponent {
  logs: TaskHistoryInterface[] = [];
  isVisible: boolean = false;
  taskTitle: string = '';

  openModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
    this.logs = [];
  }

  setLogAndOpenModal(logs: TaskHistoryInterface[], title: string): void {
    this.taskTitle = title;
    this.logs = logs;
    this.openModal();
  }
}
