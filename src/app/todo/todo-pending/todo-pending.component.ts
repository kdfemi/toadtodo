import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../../model/todo-model';
import { TodoService } from 'src/app/services/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-pending',
  templateUrl: './todo-pending.component.html',
  styleUrls: ['./todo-pending.component.css']
})
export class TodoPendingComponent implements OnInit {

  // todos: Observable<TodoModel[]>;
  todos: TodoModel[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
    // .valueChanges();
  }

}
