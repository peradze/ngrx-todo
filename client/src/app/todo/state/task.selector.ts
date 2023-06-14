import { createSelector } from '@ngrx/store';
import { selectTaskState } from '../task-feature.state';

// export const selectTaskState = (state: {tasks: TaskState}) => state.tasks;
export const selectTasks = createSelector(selectTaskState, (state) => state.tasks);
export const selectLoading = createSelector(selectTaskState, (state) => state.loading);
export const selectError = createSelector(selectTaskState, (state) => state.error);
