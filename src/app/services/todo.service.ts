import { Injectable } from '@angular/core';
import { TodoModel } from '../model/todo-model';
import { Subject, Observable } from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  emptyTodo: TodoModel[]; // store todo array for reference sake
  todoItem: TodoModel; // store todod item for reference sake

  todoObservable = new Subject<TodoModel[]>();
  todoItem$ = new Subject<TodoModel>();
  $key: string;

  constructor(private databaseService: DataStorageService) { }

  getTodos() { // working

    this.databaseService.getAllTodos()
    .subscribe((todosFromDB) => {

      this.emptyTodo = [];
      for (const todoFromDB of todosFromDB) {
        const todoPayload = todoFromDB.payload.val();
        const todoItem: TodoModel = todoPayload as TodoModel;
        todoItem.$key = todoFromDB.key;
        this.emptyTodo.push(todoItem);
      }
      this.todoObservable.next(this.emptyTodo);
    });
    return this.todoObservable.asObservable();
  }

  getTodo(itemId: number): Observable<TodoModel[]> { // working

    let reloadGetTodos;
    if (this.emptyTodo) {
      const requestedTodo = this.emptyTodo.filter(
        (item: TodoModel) => itemId === item.id)[0];
      this.$key = requestedTodo.$key; // bugg for undefined
      this.databaseService.getTodo(this.$key).subscribe(
        (todoItemValue) => {
          this.todoItem = todoItemValue;
          this.todoItem$.next(todoItemValue);
        }
      );
    } else {

      reloadGetTodos =  this.getTodos();

    }
    return reloadGetTodos;
  }

  editTodo(itemId: number, editedTodo: TodoModel) { // working

    const { id, title, task, description, owner, closed} = editedTodo;
    const newTodo = new TodoModel(id, title, task, description, owner, closed);
    return this.databaseService.putTodo(newTodo, this.$key);

  }

  addTodo(newTodo: TodoModel) { // working

    return  this.databaseService.postTodo(newTodo);

  }

  deleteTodo(itemId: number) { // working
    let promise;
    // this.getTodo(itemId);
    if (this.todoItem) {
      promise = this.databaseService.deleteTodo(this.$key);
    }
    return promise;

  }

  pendTodo(itemId: number) {
    // working
    this.todoItem.closed = !this.todoItem.closed;
    const promise = this.editTodo(itemId, this.todoItem);
    return promise;
  }

}
