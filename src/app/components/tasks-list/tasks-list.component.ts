import { Component, inject, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TaskHistoryInterface, TaskInterface } from '../../interfaces';
import { ButtonModule } from 'primeng/button';
import { TasksModalComponent } from '../tasks-modal/tasks-modal.component';
import { CommonModule } from '@angular/common';
import { StatusTagComponent } from '../status-tag/status-tag.component';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TaskService } from '../../services/task.service';
import { PriorityTagComponent } from '../priority-tag/priority-tag.component';
import { TimeLineModalComponent } from '../time-line-modal/time-line-modal.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule,
    TasksModalComponent,
    StatusTagComponent,
    PriorityTagComponent,
    TimeLineModalComponent,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  @ViewChild(TasksModalComponent, { static: true }) tasksModal:
    | TasksModalComponent
    | undefined;

  @ViewChild(TimeLineModalComponent, { static: true }) timeLineModal:
    | TimeLineModalComponent
    | undefined;

  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private readonly messageService: MessageService = inject(MessageService);
  private readonly taskService: TaskService = inject(TaskService);

  tasks: TaskInterface[] = this.taskService.getTasks();

  openCreateNewTaskModal(): void {
    this.tasksModal?.openModal();
  }

  seeTimelineLogs(logs: TaskHistoryInterface[], title: string): void {
    this.timeLineModal?.setLogAndOpenModal(logs, title);
  }

  deleteTask(event: Event, id: string): void {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Are you sure that you want to delete this task?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Yes, delete',
      rejectLabel: 'No, cancel',
      rejectButtonStyleClass: 'p-button-danger',
      acceptButtonStyleClass: 'p-button-outlined',
      accept: () => this.confirmDeleteTask(id),
    });
  }

  confirmDeleteTask(id: string): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
    this.onConfirmDeleteTaskSuccess();
  }

  onCreatedSuccess(): void {
    this.tasks = this.taskService.getTasks();
    this.messageService.add({
      severity: 'success',
      summary: 'Created',
      detail: 'You have created a new task',
    });
  }

  onUpdateSuccess(): void {
    this.tasks = this.taskService.getTasks();
    this.messageService.add({
      severity: 'success',
      summary: 'Updated',
      detail: 'You have updated the task',
    });
  }

  onConfirmDeleteTaskSuccess(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Deleted',
      detail: 'You have deleted the task',
    });
  }

  editTask(task: TaskInterface): void {
    this.tasksModal?.setDataAndOpenModal(task);
  }
}
