import { Injectable } from '@angular/core';
import { TodoModel } from '../model/todo-model';
import { Subject } from 'rxjs';
import { Task } from '../model/task';
import { storage } from 'firebase';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoChanged = new Subject<TodoModel[]>();
  todo = [
  new TodoModel(1, 'Learn Angular',
  [new Task(1, 'introduction', true),
  new Task(2, 'components', false),
  new Task(3, 'directive', false, )],
  'Learning angular from the begining to the end', 'test@test.com', false),

  new TodoModel(2, 'Learn Ionic',
  [new Task(1, 'mobile design', false),
  new Task(2, 'pages', true),
  new Task(3, 'multiple pages', false)],
  'Learning Ionic from the begining to the end', 'test@test.com', false),

  new TodoModel(3, 'Learn java',
  [new Task(1, 'javaFx', true),
  new Task(2, 'jersey', true),
  new Task(3, 'Hibernate', false),
  new Task(4, 'Spring', false)],
  'Learning angular from the begining to the end', 'test@test.com', true),

  new TodoModel(4, 'Learn Spring',
  [new Task(1, 'What is spring', true),
  new Task(2, 'Spring frameworks', true),
  new Task(3, 'Dependencing injection', true),
  new Task(4, 'IoC', true)],
  'Learning angular from the begining to the end', 'test@test.com', false)

];
  constructor() { }

  getTodos() {
    return this.todo.slice();
    // return this.dataStorageService.getAllTodos();
  }

  getTodo(itemId: number) {

    return this.todo.filter((item: TodoModel) => itemId === item.id)[0];
  }

  editTodo(itemId: number, editedTodo: TodoModel) {

    let tempIndex;

    this.todo.forEach((item, index) => {

      if (item.id === itemId) {

        tempIndex = index;

      }
    });

    this.todo[tempIndex] = editedTodo;

    this.todoChanged.next(this.todo.slice());
  }
  addTodo(newTodo: TodoModel) {
    this.todo.push(newTodo);
    this.todoChanged.next(this.todo.slice());

  }

  deleteTodo(itemId: number) {

    const index = this.getTodo(itemId);

    if (index) {

      this.todo.splice(this.todo.indexOf(index), 1);

      this.todoChanged.next(this.todo.slice());
    }

  }

  pendTodo(itemId: number) {

    const tempArr = this.getTodo(itemId);
    tempArr.closed = !tempArr.closed;
    this.editTodo(itemId, tempArr);
    this.todoChanged.next(this.todo.slice());
  }

}
