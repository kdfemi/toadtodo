import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { TodoModel } from '../model/todo-model';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private todoService: TodoService, private httpClient: HttpClient, private angularFireDatabase: AngularFireDatabase) {}

  uploadTodo(todo: TodoModel) {

      this.angularFireDatabase.list('todos').push(todo).then(() =>
        console.log('done'));

  }
  getAllTodos() {
   return this.angularFireDatabase.list<TodoModel>('todos');
  }

  // uploadTodo() {
  //   const todos = this.todoService.getTodos();
  //   const encodedEmail = btoa('test@test.com');
  //   this.httpClient.post('https://toadtodo-92e87.firebaseio.com/' + encodedEmail + '.json', todos).subscribe(
  //     (res) => {
  //       console.log(res);
  //     });

  //  }

   updateTodo() {
    const todos = this.todoService.getTodos();
    const encodedEmail = btoa('test@test.com');
    this.httpClient.put('https://toadtodo-92e87.firebaseio.com/' + encodedEmail + '.json', todos).subscribe(
      (res) => {
        console.log(res);
      });
   }

   deleteTodo() {
    const todos = this.todoService.getTodos();
    const encodedEmail = btoa('test@test.com');
    this.httpClient.put('https://toadtodo-92e87.firebaseio.com/' + encodedEmail + '.json', todos).subscribe(
      (res) => {
        console.log(res);
      });
   }

}
