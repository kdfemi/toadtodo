import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from '../../model/todo-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  constructor(private todoService: TodoService) { }

  getTodosSubscription: Subscription;
  todos: TodoModel[];

  ngOnInit(): void {

    this.todoService.getTodos();
    this.getTodosSubscription = this.todoService.todoObservable.subscribe(
      (todoArray) => {
        this.todos = todoArray;
      });

  }

  ngOnDestroy(): void {

    this.getTodosSubscription.unsubscribe();
  }

}
