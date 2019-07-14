import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from '../../todo-model';
import { Task } from '../../task';

@Component({
  selector: 'app-todo-completed-item',
  templateUrl: './todo-completed-item.component.html',
  styleUrls: ['./todo-completed-item.component.css']
})
export class TodoCompletedItemComponent implements OnInit {

@Input() todo: TodoModel;
ratio: number;
  constructor() {}

  ngOnInit() {
    this.calculateRatio();
  }

  calculateRatio(): number {
    const length = this.todo.task.length;
    let completed = 0;

    this.todo.task.forEach((tk: Task) => {
      if (tk.finished) {

        completed = completed + 1;
      }
    });
    this.ratio = Math.round( ( ( completed / length ) * 100) );
    return  this.ratio;
  }
}
