import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../todo-model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-completed',
  templateUrl: './todo-completed.component.html',
  styleUrls: ['./todo-completed.component.css']
})
export class TodoCompletedComponent implements OnInit {

  todos: TodoModel[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
  }

}
