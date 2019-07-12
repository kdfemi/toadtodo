import { Injectable } from '@angular/core';
import { TodoModel } from '../todo/todo-model';
import { Subject } from 'rxjs';
import { Task } from '../todo/task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoChanged = new Subject<TodoModel[]>();
  todo = [
  new TodoModel(1, 'Learn Angular',
  [new Task(1, 'introduction', true), new Task(2, 'components', false), new Task(3, 'directive', false)],
  'Learning angular from the begining to the end', 1),
  new TodoModel(2, 'Learn Ionic',
  [new Task(1, 'mobile design', true), new Task(2, 'pages', true), new Task(3, 'multiple pages', false)],
  'Learning Ionic from the begining to the end', 1),
  new TodoModel(3, 'Learn java',
  [new Task(1, 'javaFx', true), new Task(2, 'jersey', true), new Task(3, 'Hibernate', false), new Task(4, 'Spring', false)],
  'Learning angular from the begining to the end', 1)
];
  constructor() { }

  getTodos() {
    return this.todo.slice();
  }

  getTodo(id: number) {

    return this.todo.filter((item: TodoModel) => id === item.id)[0];
  }

  editTodo(id: number, editedTodo: TodoModel) {

    let tempIndex;

    this.todo.forEach((item, index) => {

      if (item.id === id) {

        tempIndex = index;

      }
    });

    this.todo[tempIndex] = editedTodo;

    this.todoChanged.next(this.todo.slice());
  }

  deleteTodo(id: number) {

    const index = this.getTodo(id);

    if (index) {

      this.todo.splice(this.todo.indexOf(index), 1);

      this.todoChanged.next(this.todo.slice());
    }

  }
}
