import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { TodoModel } from '../model/todo-model';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserModel } from '../model/user-model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private angularFireDatabase: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {}

  basePath = 'todos';

  userBasePath = 'users';
  database = this.angularFireDatabase.list<TodoModel>(this.basePath);
  userbase = this.angularFireDatabase.list<UserModel>(this.userBasePath);

  getAllTodos() {
    const basePath2 = `todos/${this.firebaseAuth.auth.currentUser.uid}`;
    return this.angularFireDatabase.list<TodoModel>(basePath2).snapshotChanges();
   }

  getTodo($key: string) {
    const path = `todos/${$key}`;
    const basePath2 = `todos/${this.firebaseAuth.auth.currentUser.uid}/${$key}`;
    return this.angularFireDatabase.object<TodoModel>(basePath2).valueChanges();

   }

  postTodo(todo: TodoModel) {
    const basePath2 = `todos/${this.firebaseAuth.auth.currentUser.uid}`;
    return this.angularFireDatabase.list<TodoModel>(basePath2).push(todo);
  }

  putTodo(todo: TodoModel, $key: string) {
    const path = `todos/${$key}`;
    const path2 = `todos/${this.firebaseAuth.auth.currentUser.uid}/${$key}`;
    return this.angularFireDatabase.object(path2).update(todo);
   }

   deleteTodo($key: string) {
    const path = `todos/${$key}`;
    const path2 = `todos/${this.firebaseAuth.auth.currentUser.uid}/${$key}`;
    return this.angularFireDatabase.object(path2).remove();
   }

   updateUser(uid: string, user: UserModel) {
     return this.userbase.set(uid, user);
   }

}
