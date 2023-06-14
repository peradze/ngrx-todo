import { createActionGroup, props } from '@ngrx/store';
import { Task } from '../models/Task';

export const TaskAPIActions = createActionGroup({
  source: 'Task API',
  events: {
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: any }>(),
    'Create Task Success': props<{ task: Task }>(),
    'Create Task Failure': props<{ error: any }>(),
    'Update Task Success': props<{ task: Task }>(),
    'Update Task Failure': props<{ error: any }>(),
    'Delete Task Success': props<{ taskId: number }>(),
    'Delete Task Failure': props<{ error: any }>(),
  },
});
