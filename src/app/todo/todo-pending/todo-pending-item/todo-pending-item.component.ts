import { Component, OnInit, Input } from '@angular/core';
import { TodoModel } from '../../todo-model';
import { Task } from '../../task';

@Component({
  selector: 'app-todo-pending-item',
  templateUrl: './todo-pending-item.component.html',
  styleUrls: ['./todo-pending-item.component.css']
})
export class TodoPendingItemComponent implements OnInit {

  @Input() todo: TodoModel;
  ratio: number;
  constructor() { }

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
