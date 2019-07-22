import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoModel } from '../../model/todo-model';
import { TodoService } from 'src/app/services/todo.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-completed',
  templateUrl: './todo-completed.component.html',
  styleUrls: ['./todo-completed.component.css']
})
export class TodoCompletedComponent implements OnInit, OnDestroy {

  todos: TodoModel[];
  todoObservable$: Subscription;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos();
    this.todoObservable$ = this.todoService.todoObservable.subscribe(
      (todoArray) => {
        this.todos = todoArray;
      });
  }
  ngOnDestroy() {
    this.todoObservable$.unsubscribe();
  }

}
