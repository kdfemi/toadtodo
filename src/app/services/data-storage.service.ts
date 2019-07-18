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

   postTodo(todo: TodoModel) {

    return this.database.push(todo);

}

  putTodo(todo: TodoModel, $key: string) {
    const basepath = `todos/${$key}`;
    return this.angularFireDatabase.object(basepath).update(todo);
   }
}
