import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../todo-model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-pending',
  templateUrl: './todo-pending.component.html',
  styleUrls: ['./todo-pending.component.css']
})
export class TodoPendingComponent implements OnInit {

  todos: TodoModel[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
  }

}
