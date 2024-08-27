import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';

import { StatusEnum } from '../../enums';
import { OptionInterface, TaskInterface } from '../../interfaces';
import { PriorityOptions } from '../../options';
import { StatusOptions } from '../../options/status.options';
import { TaskService } from '../../services/task.service';
import { generateUniqueId } from '../../utils/generate-unique-id.util';

@Component({
  selector: 'app-tasks-modal',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    SelectButtonModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextareaModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
  ],
  templateUrl: './tasks-modal.component.html',
  styleUrl: './tasks-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TasksModalComponent implements OnInit {
  @Output() createdSuccess = new EventEmitter();
  @Output() updatedSuccess = new EventEmitter();

  isVisible: boolean = false;
  isUpdate: boolean = false;
  currentTask: TaskInterface | null = null;
  taskForm: FormGroup = new FormGroup({});
  priorityOptions: OptionInterface[] = PriorityOptions;
  statusOptions: OptionInterface[] = StatusOptions;
  currentDay: Date = new Date();

  private readonly taskService: TaskService = inject(TaskService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.setUpForm();
  }

  openModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isUpdate = false;
    this.isVisible = false;
    this.taskForm.reset();
  }
  private setUpForm(): void {
    this.taskForm = this.formBuilder.group({
      title: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      status: [StatusEnum.TODO, Validators.required],
      dueDate: [null, [Validators.required, Validators.minLength(3)]],
      priority: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  setDataAndOpenModal(data: TaskInterface): void {
    this.isUpdate = true;
    this.currentTask = data;
    this.taskForm.patchValue(data);
    this.openModal();
  }

  saveTask(): void {
    const newTask = this.taskForm.value;

    if (this.isUpdate && this.currentTask) {
      this.taskService.updateTask(this.currentTask?.id, newTask);
      this.updatedSuccess.emit();
    } else {
      this.taskService.addTask({ id: generateUniqueId(), ...newTask });
      this.createdSuccess.emit();
    }
    this.taskForm.reset();
    this.currentTask = null;
    this.closeModal();
  }
}
