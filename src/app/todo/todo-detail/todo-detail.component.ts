import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoModel } from '../todo-model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  id: number;
  todo: TodoModel;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    const value = 'id';

    this.route.params.subscribe((param) => {
     this.id = +param[value];
    });

    this.todo = this.todoService.getTodo(this.id);
  }

  navBack() {
    this.router.navigate(['todo', 'list']);
  }

  pend() {
    this.todoService.pendTodo(this.id);
  }

  delete() {
    this.todoService.deleteTodo(this.id);
    this.navBack();
  }

  edit() {
    this.router.navigate(['todo', 'edit', this.id]);
  }
}
