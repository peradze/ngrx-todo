import { Injectable } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';
import { TaskPageActions } from './task-page.action';
import { TaskAPIActions } from './task-api.action';

@Injectable()
export class TaskEffect {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskPageActions.enter),
      exhaustMap(() =>
        this.taskService.getAll().pipe(
          map((tasks) => TaskAPIActions.loadTasksSuccess({ tasks })),
          catchError((error) => of(TaskAPIActions.loadTasksFailure({ error }))),
        ),
      ),
    ),
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskPageActions.createTask),
      concatMap(({ task }) =>
        this.taskService.create(task).pipe(
          map((createdTask) => TaskAPIActions.createTaskSuccess({ task: createdTask })),
          catchError((error) => of(TaskAPIActions.createTaskFailure({ error }))),
        ),
      ),
    ),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskPageActions.updateTask),
      concatMap(({ task }) =>
        this.taskService.update(task).pipe(
          map((updatedTask) => TaskAPIActions.updateTaskSuccess({ task: updatedTask })),
          catchError((error) => of(TaskAPIActions.updateTaskFailure({ error }))),
        ),
      ),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskPageActions.deleteTask),
      mergeMap(({ taskId }) =>
        this.taskService.delete(taskId).pipe(
          map(() => TaskAPIActions.deleteTaskSuccess({ taskId })),
          catchError((error) => of(TaskAPIActions.deleteTaskFailure({ error }))),
        ),
      ),
    ),
  );
  constructor(private actions$: Actions, private taskService: TaskService) {}
}
