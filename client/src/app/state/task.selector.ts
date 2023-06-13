import { TaskState } from './task.reducer';
import { createSelector } from '@ngrx/store';

export const selectTaskState = (state: {tasks: TaskState}) => state.tasks;
export const selectTasks = createSelector(selectTaskState, (state) => state.tasks);
export const selectLoading = createSelector(selectTaskState, (state) => state.loading);
export const selectError = createSelector(selectTaskState, (state) => state.error);
