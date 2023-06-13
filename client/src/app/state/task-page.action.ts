import { createAction, props } from '@ngrx/store';
import { Task } from '../Task';

export const enter = createAction('[Task Page] Enter');
export const createTask = createAction('[Task Page] Create Task', props<{ task: Task }>());
export const updateTask = createAction('[Task Page] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task Page] Delete Task', props<{ taskId: number }>());
