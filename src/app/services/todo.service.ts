import { Injectable } from '@angular/core';
import { TodoModel } from '../todo/todo-model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  todo = new TodoModel(1, 'Learn Angular', [], 'Learning angular from the begining to the end')
  constructor() { }
}
