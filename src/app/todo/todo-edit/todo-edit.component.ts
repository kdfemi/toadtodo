import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Task } from '../task';
import { TodoModel } from '../todo-model';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {


  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router) { }

  id: number;
  editMode = false;
  todoForm: FormGroup;
  editedTask: Task[] = [];

  ngOnInit() {
    this.route.params.subscribe(param => {
      const id = 'id';
      this.id = +param[id];
      this.editMode = (param[id] != null);
      this.buildForm();
      // console.log(this.todoForm);
      // console.log(this.getTask);
    });
  }

  private buildForm() {
    let title = '';
    let description = '';

    let task = new FormArray([
      new FormControl(null, Validators.required)
    ]);

    if (this.editMode) {
      const todo = this.todoService.getTodo(this.id);
      title = todo.title;
      description = todo.description;
      task = new FormArray([]);

      for (const taskEl of todo.task) {
        const tempTask =  taskEl.task;
        task.push(new FormControl(tempTask, Validators.required));
        this.editedTask.push(taskEl);
      }

    }
    this.todoForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      tasks: task
    });
  }
  get getTask() {
    return this.todoForm.get('tasks') as FormArray;
  }
  get getTitle() {
    return this.todoForm.get('title');
  }
  get getDescription() {
    return this.todoForm.get('description');
  }

  insertTask() {
    const formControl = new FormControl(null, Validators.required)
    this.getTask.controls.push(formControl);
    console.log(formControl)
    console.log(this.todoForm);
  }
  removeTask(id: number) {
    if (this.getTask.controls.length > 1) {
      this.getTask.controls.splice(id, 1);
      if (!(id > this.editedTask.length) ) {
        this.editedTask.splice(id - 1, 1);
      }
    }
  }

  saveTodo() {
    const title = this.todoForm.get('title').value;
    const description = this.todoForm.get('description').value;
    const tasks: Task[] = [];
    const taskControl = this.getTask.controls;
    const newTodo = new TodoModel(null, title, null, description, 1, false);

    if (this.editMode) {
      newTodo.id = this.id;
      let index = 0;

      while (!(index >= this.editedTask.length)) {
          const currentTask = this.editedTask[index];
          tasks.push(
            new Task(currentTask.id, currentTask.task, currentTask.finished));
          index++;
        }

      const length = taskControl.length - this.editedTask.length;
      for (let i = 0; i < length;   i++ ) {
          tasks.push(
            new Task(index, taskControl[index].value, false));
  }

      newTodo.task = this.editedTask;
      newTodo.task = tasks;
      this.todoService.editTodo(this.id, newTodo);
    } else {

      let index = 1;
      for (const task of taskControl) {
        tasks.push(
          new Task(index, task.value, false));
        index++;
      }
      const length = this.todoService.getTodos().length;
      newTodo.id = length + 1;
      newTodo.task = tasks;
      this.todoService.addTodo(newTodo);
      this.id = newTodo.id;
    }
    this.router.navigate(['/', 'todo', 'list', this.id]);
  }
}
