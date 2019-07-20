import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoModel } from '../../model/todo-model';
import { TodoService } from 'src/app/services/todo.service';
import { NgForm } from '@angular/forms';
import { Task } from '../../model/task';
import { CompletionLevelRatioService } from 'src/app/services/completion-level-ratio.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private todoService: TodoService,
              private router: Router, private ratioCalculationService: CompletionLevelRatioService) { }

  id: number;
  todo: TodoModel;
  task: Task;
  ratio: number;
  getTodosubscription$: Subscription;
  getTodo$: Subscription;

  ngOnInit() {
    const value = 'id';
    // get route snapshot(getting id)
    this.route.params.subscribe((param) => {
     this.id = +param[value];
    });

    const getTodo: Observable<TodoModel[]> = this.todoService.getTodo(this.id);

    if (getTodo) { // if geTodo defined, because of reloading to get all todos again
      this.getTodo$ = getTodo.subscribe(
        () => {
          console.log(this.todoService.emptyTodo.length);
          if (this.todoService.emptyTodo.length >= this.id) {
            this.todoService.getTodo(this.id);
          } else {
            this.router.navigate(['todo', 'not-found']);
          }


        }
      );
    }

    this.getTodosubscription$ = this.todoService.todoItem$.subscribe(
      (todo: TodoModel) => {
        if (todo) {
          this.todo = todo;
          this.ratio = this.ratioCalculationService.calculateRatio(this.todo); // to hide pend/unpend option if task completes
        }

      });
  }

  navBack() {
    this.router.navigate(['todo', 'list']);
  }

  // activated when check box is clicked  automatically update
  finishedTodo(index: number, todoDetailForm: NgForm) {
    console.log(todoDetailForm.form.value);
    this.todo.task[index].finished = !todoDetailForm.form.value[index + 1];
    this.todoService.editTodo(this.id, this.todo).then(
      () =>  setTimeout(() => {
        this.ratio = this.ratioCalculationService.calculateRatio(this.todo);
      }, 300)
    );


  }

  pend() {
    this.todoService.pendTodo(this.id);
  }

  delete() {
    this.todoService.deleteTodo(this.id)
    .then(() => this.navBack());
  }

  edit() {
    this.router.navigate(['todo', 'edit', this.id]);
  }

  ngOnDestroy(): void {
    if (this.getTodosubscription$) {
      this.getTodosubscription$.unsubscribe();
    }

    if (this.getTodo$) {
      this.getTodo$.unsubscribe();
    }
  }

}
