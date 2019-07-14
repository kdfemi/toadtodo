import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from '../todo-model';

@Component({
  selector: 'app-todo-start',
  templateUrl: './todo-start.component.html',
  styleUrls: ['./todo-start.component.css']
})
export class TodoStartComponent implements OnInit {

  todos: TodoModel[];
  todoStat: {'all': number, 'completed': number, 'ongoing': number, 'pending': number };

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
    this.todoStat = this.determineStat(this.todos);
  }

  determineStat(todos: TodoModel[]): {'all': number, 'completed': number, 'ongoing': number, 'pending': number } {

    let Pending = 0;
    let Ongoing = 0;
    let Completed = 0;
    const All = todos.length;

    for (const todo of todos) {

      if (todo.closed === true) {
        Pending += 1;
        continue;
      }

      for (const tk of todo.task) {
        if (!tk.finished) {
          Ongoing += 1;
          break;
        }
      }
    }
    Completed = All - (Pending + Ongoing);

    return {all: All, completed: Completed, ongoing: Ongoing, pending: Pending };
  }

}
