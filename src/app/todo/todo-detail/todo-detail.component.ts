import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoModel } from '../../model/todo-model';
import { TodoService } from 'src/app/services/todo.service';
import { NgForm } from '@angular/forms';
import { Task } from '../../model/task';
import { CompletionLevelRatioService } from 'src/app/services/completion-level-ratio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit, OnDestroy {

  id: number;
  todo: TodoModel;
  task: Task;
  ratio: number;
  getTodosubscription: Subscription;

  constructor(private route: ActivatedRoute, private todoService: TodoService,
              private router: Router, private ratioCalculationService: CompletionLevelRatioService) { }

  ngOnInit() {
    const value = 'id';
    // get route snapshot(getting id)
    this.route.params.subscribe((param) => {
     this.id = +param[value];
    });
    this.todo = this.todoService.getTodo(this.id);
    this.ratio = this.ratioCalculationService.calculateRatio(this.todo);

    this. getTodosubscription = this.todoService.todoObservable.subscribe(
      newTodo => {
        this.todo = newTodo[this.id - 1];
        console.log(this.todo);
      }
    );
  }

  navBack() {
    this.router.navigate(['todo', 'list']);
  }

  // activated when check box is clicked  automatically update
  finishedTodo(index: number, todoDetailForm: NgForm) {

    this.todo.task[index].finished = todoDetailForm.form.value[index + 1];
    this.todoService.editTodo(this.id, this.todo).then(
      () =>  setTimeout(() => {
        this.ratio = this.ratioCalculationService.calculateRatio(this.todo);
      }, 300)
    );


  }

  pend() {
    this.todoService.pendTodo(this.id);
    console.log(this.todo);
  }

  delete() {
    this.todoService.deleteTodo(this.id);
    this.navBack();
  }

  edit() {
    this.router.navigate(['todo', 'edit', this.id]);
  }

  ngOnDestroy(): void {
    // this. getTodosubscription.unsubscribe();
  }

}
