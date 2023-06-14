import { taskReducer, TaskState } from './state/task.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export const FEATURE_KEY = 'shared-tasks';

export interface FeatureState {
  tasks: TaskState;
}
export const reducers: ActionReducerMap<FeatureState> = {
  tasks: taskReducer,
};
export const selectSharedTasksState = createFeatureSelector<FeatureState>(FEATURE_KEY);
export const selectTaskState = createSelector(
  selectSharedTasksState,
  (state: FeatureState) => state.tasks,
);
