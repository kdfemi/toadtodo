import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { TodoModel } from './todo/todo-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private todoService: TodoService) {}



}
