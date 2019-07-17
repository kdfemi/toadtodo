import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Task } from '../../model/task';
import { TodoModel } from '../../model/todo-model';

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
  editedTask: Task[] = []; // stores initial state of the todo task in edited mode

  ngOnInit() {
    this.route.params.subscribe(param => {
      const id = 'id';
      this.id = +param[id];
      this.editMode = (param[id] != null);
      this.buildForm();

    });
  }

  private buildForm() {
    let title = '';
    let description = '';
    const task = new FormArray([
      new FormControl('', Validators.required)
    ]);

    if (this.editMode) {
      const todo = this.todoService.getTodo(this.id);
      title = todo.title;
      description = todo.description;
      task.clear(); // clear the initial control

      // get the task value only from todo task array then push all tasks to `editedTask` array
      for (const taskEl of todo.task) {
        const tempTask =  taskEl.task;
        task.push(new FormControl(tempTask, Validators.required));
        this.editedTask.push(taskEl); // storing initial state of todo
      }

    }
    this.todoForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      tasks: task
    });
  }
  // getting controls from the form
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
    const formControl = new FormControl('', Validators.required);
    this.getTask.push(formControl);
  }

  removeTask(index: number) {
    // prevent task from beign deleted if it's the only task
    if (this.getTask.length > 1) {

      this.getTask.removeAt(index); // remove task from the form array

      // incase of edited mode remove task from `editedTask` too
      if (!(index > this.editedTask.length) ) {
        this.editedTask.splice(index, 1);
      }
    }
  }

  saveTodo() {

    // get all controls value
    const title = this.getTitle.value;
    const description = this.getDescription.value;
    const taskControl = this.getTask.controls;  // getting all controls in the array

    const tasks: Task[] = []; // array to store manipulated task to be saved

    const newTodo = new TodoModel(null, title, null, description, 'test@test.com', false); // todo structure for new or edited todo

    if (this.editMode) {

      newTodo.id = this.id; // store the edited todo id

      let index = 0; /* iterator to compare to `editedTask` length
      and get `editedTask` values and `taskControl` values for newly added tasks*/

      // reconstruct edited tasks and push to `task` array
      while (!(index >= this.editedTask.length)) {

        const currentTask = this.editedTask[index];
        tasks.push(new Task(currentTask.id, currentTask.task, currentTask.finished));
        index++;
        }

      let id = index + 1; // since task id doesnt start from zero

      const length = taskControl.length - this.editedTask.length; /* to determine where the just
      added task should start from in the main `task`*/

      for (let i = 0; i < length;   i++ ) {
          tasks.push(new Task(id, taskControl[index].value, false));
          index++;
          id++;
        }

      // newTodo.task = this.editedTask;
      newTodo.task = tasks;
      this.todoService.editTodo(this.id, newTodo);
    } else {
      // sets id for the task
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
    console.log(this.todoService.getTodo(this.id));
    this.router.navigate(['/', 'todo', 'list', this.id]);
  }
  cancel() {
    if (this.editMode) {
      this.router.navigate(['/', 'todo', 'list', this.id]);
    } else {
      this.router.navigate(['/', 'todo']);
    }
  }
}
