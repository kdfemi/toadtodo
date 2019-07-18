import { Injectable } from '@angular/core';
import { TodoModel } from '../model/todo-model';
import { Subject, Observable } from 'rxjs';
import { Task } from '../model/task';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  /**
   * @deprecated
   */
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

  private emptyTodo: TodoModel[];
  todoObservable = new Subject<TodoModel[]>();
  /**
   * @deprecated use todoObservable
   */
  todoChanged = new Subject<TodoModel[]>(); // for backward compatibility

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
    // return this.todoObservable.asObservable();
    return this.todo.slice(); // for backward compatibility
  }

  getTodo(itemId: number) { // working
    // i need to fix reloading bug (error) after forward compatibility
    return this.emptyTodo.filter(
      (item: TodoModel) => itemId === item.id)[0];
  }

  editTodo(itemId: number, editedTodo: TodoModel) {

    const { id, title, task, description, owner, closed} = editedTodo;
    const newTodo = new TodoModel(id, title, task, description, owner, closed);
    this.todoObservable.next(this.emptyTodo);
    return this.databaseService.putTodo(newTodo, editedTodo.$key);

  }

  addTodo(newTodo: TodoModel) { // working

    this.todo.push(newTodo);
    this.todoChanged.next(this.todo.slice());
    return  this.databaseService.postTodo(newTodo);

  }

  deleteTodo(itemId: number) {

    const index = this.getTodo(itemId);

    if (index) {

      this.todo.splice(this.todo.indexOf(index), 1);

      this.todoChanged.next(this.todo.slice());
    }

  }

  pendTodo(itemId: number) {
    // working
    const tempArr = this.getTodo(itemId);
    tempArr.closed = !tempArr.closed;
    this.editTodo(itemId, tempArr);
  }

}
