import { createReducer, on } from '@ngrx/store';
import { Task } from '../Task';
import { TaskAPIAction, TaskPageAction } from './index';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: any;
}

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null
};

export const taskReducer = createReducer(
  initialState,
  on(TaskPageAction.enter, (state) => ({ ...state, loading: true })),
  on(TaskAPIAction.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false
  })),
  on(TaskAPIAction.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(TaskPageAction.createTask, (state) => ({ ...state, loading: true })),
  on(TaskAPIAction.createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    loading: false
  })),
  on(TaskAPIAction.createTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(TaskPageAction.updateTask, (state) => ({ ...state, loading: true })),
  on(TaskAPIAction.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    loading: false
  })),
  on(TaskAPIAction.updateTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(TaskPageAction.deleteTask, (state) => ({ ...state, loading: true })),
  on(TaskAPIAction.deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== taskId),
    loading: false
  })),
  on(TaskAPIAction.deleteTaskFailure, (state, { error }) => ({ ...state, loading: false, error }))
);


