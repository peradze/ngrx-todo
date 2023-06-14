import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectError, selectLoading, selectTasks } from './state/task.selector';
import { TaskState } from './state/task.reducer';
import { TaskPageAction } from './state';
import { Task } from './Task';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tasks$ = this.store.select(selectTasks);
  loading$ = this.store.select(selectLoading);
  error$: Observable<HttpErrorResponse> = this.store.select(selectError);
  nameController = new FormControl('', Validators.required);

  constructor(private store: Store<{ tasks: TaskState }>) {}

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
