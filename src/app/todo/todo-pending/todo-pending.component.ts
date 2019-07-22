import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoModel } from '../../model/todo-model';
import { TodoService } from 'src/app/services/todo.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-pending',
  templateUrl: './todo-pending.component.html',
  styleUrls: ['./todo-pending.component.css']
})
export class TodoPendingComponent implements OnInit, OnDestroy {

  todos$: Subscription;
  todos: TodoModel[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos();
    this.todos$ = this.todoService.todoObservable.subscribe(
      (todoArray) => {
        this.todos = todoArray;
      });
  }

  ngOnDestroy() {
    this.todos$.unsubscribe();
  }

}
