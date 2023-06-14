import { createFeature } from '@ngrx/store';
import { taskReducer } from './state/task.reducer';

export const tasksFeature = createFeature({
  name: 'tasks',
  reducer: taskReducer,
});

export const { name, reducer, selectTasksState, selectTasks, selectLoading, selectError } =
  tasksFeature;
