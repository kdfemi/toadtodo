import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoModel } from '../todo-model';
import { TodoService } from 'src/app/services/todo.service';
import { NgForm } from '@angular/forms';
import { Task } from '../task';
import { CompletionLevelRatioService } from 'src/app/services/completion-level-ratio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
  // providers: [ CompletionLevelRatioService]
})
export class TodoDetailComponent implements OnInit, OnChanges, OnDestroy {

  id: number;
  todo: TodoModel;
  task: Task;
  ratio: number;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private todoService: TodoService,
              private router: Router, private ratioCalculationService: CompletionLevelRatioService) { }

  ngOnInit() {

    const value = 'id';

    this.route.params.subscribe((param) => {
     this.id = +param[value];
    });

    this.todo = this.todoService.getTodo(this.id);
    this.ratio = this.ratioCalculationService.calculateRatio(this.todo);

    this.subscription = this.todoService.todoChanged.subscribe(
      newTodo => {
        this.todo = newTodo[this.id - 1];
      }
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('something ', changes);
  }

  navBack() {
    this.router.navigate(['todo', 'list']);
  }

  finishedTodo(index: number, todoDetailForm: NgForm) {
    this.todo.task[index].finished = todoDetailForm.form.value[index + 1];
    this.todoService.editTodo(this.id, this.todo);
    setTimeout(() => {
      this.ratio = this.ratioCalculationService.calculateRatio(this.todo);
      console.log('inside timer ', this.ratio);
    }, 100);
    console.log('outside timer ', this.ratio);

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
    this.subscription.unsubscribe();
  }

}
