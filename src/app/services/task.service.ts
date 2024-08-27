import { Injectable, signal } from '@angular/core';

import { TaskInterface } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = signal<TaskInterface[]>(this.loadTasksFromLocalStorage());

  getTasks() {
    return this.tasks();
  }

  addTask(task: TaskInterface) {
    task.history = [{ change: 'Task Created', timestamp: new Date() }];
    this.tasks.update((tasks) => {
      const updatedTasks = [...tasks, task];
      this.saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }

  updateTask(taskId: string, updatedTask: Partial<TaskInterface>) {
    this.tasks.update((tasks) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          const updatedHistory = [
            ...task.history,
            { change: 'Task Updated', timestamp: new Date() },
          ];
          return { ...task, ...updatedTask, history: updatedHistory };
        }
        return task;
      });
      this.saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }

  deleteTask(taskId: string) {
    this.tasks.update((tasks) => {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      this.saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }

  private loadTasksFromLocalStorage(): TaskInterface[] {
    const tasksJson = localStorage.getItem('tasks');
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  private saveTasksToLocalStorage(tasks: TaskInterface[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
