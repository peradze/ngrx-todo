import { createAction, props } from '@ngrx/store';
import { Task } from '../Task';

export const loadTasksSuccess = createAction(
  '[Task API] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Task API] Load Tasks Failure',
  props<{ error: any }>()
);

export const createTaskSuccess = createAction(
  '[Task API] Create Task Success',
  props<{ task: Task }>()
);
export const createTaskFailure = createAction(
  '[Task API] Create Task Failure',
  props<{ error: any }>()
);
export const updateTaskSuccess = createAction(
  '[Task API] Update Task Success',
  props<{ task: Task }>()
);
export const updateTaskFailure = createAction(
  '[Task API] Update Task Failure',
  props<{ error: any }>()
);
export const deleteTaskSuccess = createAction(
  '[Task API] Delete Task Success',
  props<{ taskId: number }>()
);
export const deleteTaskFailure = createAction(
  '[Task API] Delete Task Failure',
  props<{ error: any }>()
);
