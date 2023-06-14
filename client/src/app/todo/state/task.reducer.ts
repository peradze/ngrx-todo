import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/Task';
import { TaskPageActions } from './task-page.action';
import { TaskAPIActions } from './task-api.action';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: any;
}

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(TaskPageActions.enter, (state) => ({ ...state, loading: true })),
  on(TaskAPIActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
  })),
  on(TaskAPIActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TaskPageActions.createTask, (state) => ({ ...state, loading: true })),
  on(TaskAPIActions.createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    loading: false,
  })),
  on(TaskAPIActions.createTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(TaskPageActions.updateTask, (state) => ({ ...state, loading: true })),
  on(TaskAPIActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    loading: false,
  })),
  on(TaskAPIActions.updateTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(TaskPageActions.deleteTask, (state) => ({ ...state, loading: true })),
  on(TaskAPIActions.deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== taskId),
    loading: false,
  })),
  on(TaskAPIActions.deleteTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
