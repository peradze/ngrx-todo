import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../models/Task';

export const TaskPageActions = createActionGroup({
  source: 'Task Page',
  events: {
    Enter: emptyProps(),
    'Create Task': props<{ task: Task }>(),
    'Update Task': props<{ task: Task }>(),
    'Delete Task': props<{ taskId: number }>(),
  },
});
