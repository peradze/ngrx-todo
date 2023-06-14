import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TaskPageAction } from './state';
import { Task } from './models/Task';
import { selectError, selectLoading, selectTasks } from './tasks.feature';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  tasks$ = this.store.select(selectTasks);
  loading$ = this.store.select(selectLoading);
  error$: Observable<HttpErrorResponse> = this.store.select(selectError);
  nameController = new FormControl('', Validators.required);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(TaskPageAction.enter());
  }

  toggleComplete(task: Task) {
    let updatedTask = { ...task, isComplete: !task.isComplete };
    this.store.dispatch(TaskPageAction.updateTask({ task: updatedTask }));
  }

  addTask() {
    this.store.dispatch(TaskPageAction.createTask({ task: { name: this.nameController.value! } }));
  }

  deleteTask(task: Task) {
    this.store.dispatch(TaskPageAction.deleteTask({ taskId: task.id! }));
  }
}
