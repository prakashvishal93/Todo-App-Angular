import { TaskHistoryInterface } from './task-history.interface';

export interface TaskInterface {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Completed';
  history: TaskHistoryInterface[];
}
