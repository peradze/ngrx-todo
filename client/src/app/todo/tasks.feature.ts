import { createFeature, createSelector } from '@ngrx/store';
import { selectAll, taskReducer } from './state/task.reducer';

export const tasksFeature = createFeature({
  name: 'tasks',
  reducer: taskReducer,
});

export const { name, reducer, selectTasksState, selectLoading, selectError } = tasksFeature;

export const selectAllTask = createSelector(selectTasksState, selectAll);
