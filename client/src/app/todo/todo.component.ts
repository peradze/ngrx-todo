import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from './models/Task';
import { selectAllTask, selectError, selectLoading } from './tasks.feature';
import { TaskPageActions } from './state/task-page.action';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  tasks$ = this.store.select(selectAllTask);
  loading$ = this.store.select(selectLoading);
  error$: Observable<HttpErrorResponse> = this.store.select(selectError);
  nameController = new FormControl('', Validators.required);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(TaskPageActions.enter());
  }

  toggleComplete(task: Task) {
    let updatedTask = { ...task, isComplete: !task.isComplete };
    this.store.dispatch(TaskPageActions.updateTask({ task: updatedTask }));
  }

  addTask() {
    this.store.dispatch(TaskPageActions.createTask({ task: { name: this.nameController.value! } }));
  }

  deleteTask(task: Task) {
    this.store.dispatch(TaskPageActions.deleteTask({ taskId: task.id! }));
  }
}
