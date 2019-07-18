import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from '../../model/todo-model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-todo-start',
  templateUrl: './todo-start.component.html',
  styleUrls: ['./todo-start.component.css']
})
export class TodoStartComponent implements OnInit, OnDestroy {



  todoStat: {'all': number, 'completed': number, 'ongoing': number, 'pending': number };

  constructor(private todoService: TodoService) { }
  getTodosSubscription: Subscription;
  ngOnInit() {

  this.todoService.getTodos();
  this.getTodosSubscription = this.todoService.todoObservable.subscribe((e: TodoModel[]) => {
    this.todoStat = this.determineStat(e);
    });
  }

  ngOnDestroy() {
    // this.getTodosSubscription.unsubscribe();
  }

  determineStat(todos: TodoModel[]): {'all': number, 'completed': number, 'ongoing': number, 'pending': number } {

    let Pending = 0;
    let Ongoing = 0;
    let Completed = 0;
    const All = todos.length;

    for (const todo of todos) {
      const taskArray = todo.task;

      if (todo.closed === true) {
        Pending += 1;
        continue;
      }

      for (const task of taskArray) {
        if (!task.finished) {
          Ongoing += 1;
          break;
        }
      }

    }
    Completed = All - (Pending + Ongoing);

    return {all: All, completed: Completed, ongoing: Ongoing, pending: Pending };
  }

}
