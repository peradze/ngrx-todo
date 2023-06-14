import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/Task';
import { TaskPageActions } from './task-page.action';
import { TaskAPIActions } from './task-api.action';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface TaskState extends EntityState<Task> {
  loading: boolean;
  error: any;
}

export const adapter = createEntityAdapter<Task>();

export const initialState: TaskState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const taskReducer = createReducer(
  initialState,
  on(TaskPageActions.enter, (state) => ({ ...state, loading: true })),
  on(TaskAPIActions.loadTasksSuccess, (state, { tasks }) => {
    return adapter.addMany(tasks, { ...state, loading: false });
  }),
  on(TaskAPIActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TaskPageActions.createTask, (state) => ({ ...state, loading: true })),
  on(TaskAPIActions.createTaskSuccess, (state, { task }) => {
    return adapter.addOne(task, { ...state, loading: false });
  }),
  on(TaskAPIActions.createTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(TaskPageActions.updateTask, (state) => ({ ...state, loading: true })),
  on(TaskAPIActions.updateTaskSuccess, (state, { task }) => {
    return adapter.updateOne({ id: task.id!, changes: task }, { ...state, loading: false });
  }),
  on(TaskAPIActions.updateTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(TaskPageActions.deleteTask, (state) => ({ ...state, loading: true })),
  on(TaskAPIActions.deleteTaskSuccess, (state, { taskId }) => {
    return adapter.removeOne(taskId, { ...state, loading: false });
  }),
  on(TaskAPIActions.deleteTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

export const { selectAll } = adapter.getSelectors();
