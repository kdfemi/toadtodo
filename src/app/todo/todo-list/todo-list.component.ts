import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from '../todo-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  constructor(private todoService: TodoService) { }

  todoChangedSub: Subscription;
  todos = this.todoService.getTodos();

  ngOnInit(): void {

    this.todoChangedSub = this.todoService.todoChanged.subscribe((todo: TodoModel[]) => {
      this.todos = todo;
    });

  }

  ngOnDestroy(): void {
    this.todoChangedSub.unsubscribe();
  }

}
