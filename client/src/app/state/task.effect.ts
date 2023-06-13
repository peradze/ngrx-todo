import { Injectable } from '@angular/core';
import { TaskService } from '../task.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskAPIAction, TaskPageAction } from './index';
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TaskEffect {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskPageAction.enter),
      exhaustMap(() =>
        this.taskService.getAll().pipe(
          map((tasks) => TaskAPIAction.loadTasksSuccess({ tasks })),
          catchError((error) => of(TaskAPIAction.loadTasksFailure({ error }))),
        ),
      ),
    ),
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskPageAction.createTask),
      concatMap(({ task }) =>
        this.taskService.create(task).pipe(
          map((createdTask) => TaskAPIAction.createTaskSuccess({ task: createdTask })),
          catchError((error) => of(TaskAPIAction.createTaskFailure({ error }))),
        ),
      ),
    ),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskPageAction.updateTask),
      concatMap(({ task }) =>
        this.taskService.update(task).pipe(
          map((updatedTask) => TaskAPIAction.updateTaskSuccess({ task: updatedTask })),
          catchError((error) => of(TaskAPIAction.updateTaskFailure({ error }))),
        ),
      ),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskPageAction.deleteTask),
      mergeMap(({ taskId }) =>
        this.taskService.delete(taskId).pipe(
          map(() => TaskAPIAction.deleteTaskSuccess({ taskId })),
          catchError((error) => of(TaskAPIAction.deleteTaskFailure({ error }))),
        ),
      ),
    ),
  );
  constructor(private actions$: Actions, private taskService: TaskService) {}
}
