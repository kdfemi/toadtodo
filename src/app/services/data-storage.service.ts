import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { TodoModel } from '../model/todo-model';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private angularFireDatabase: AngularFireDatabase) {}

  basePath = 'todos';
  database = this.angularFireDatabase.list<TodoModel>(this.basePath);

  getAllTodos() {
    return this.database.snapshotChanges();
   }

  getTodo($key: string) {
    const path = `todos/${$key}`;
    return this.angularFireDatabase.object<TodoModel>(path).valueChanges();
   }

  postTodo(todo: TodoModel) {

    return this.database.push(todo);
  }

  putTodo(todo: TodoModel, $key: string) {
    const path = `todos/${$key}`;
    return this.angularFireDatabase.object(path).update(todo);
   }

   deleteTodo($key: string) {
    const path = `todos/${$key}`;
    return this.angularFireDatabase.object(path).remove();
   }

}
