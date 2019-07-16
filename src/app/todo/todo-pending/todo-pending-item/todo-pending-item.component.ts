import { Component, OnInit, Input } from '@angular/core';
import { TodoModel } from '../../todo-model';
import { Task } from '../../task';
import { CompletionLevelRatioService } from 'src/app/services/completion-level-ratio.service';

@Component({
  selector: 'app-todo-pending-item',
  templateUrl: './todo-pending-item.component.html',
  styleUrls: ['./todo-pending-item.component.css'],
})
export class TodoPendingItemComponent implements OnInit {

  @Input() todo: TodoModel;
  ratio: number;
  constructor(private calculateRatioService: CompletionLevelRatioService) { }

  ngOnInit() {

    this.ratio = this.calculateRatioService.calculateRatio(this.todo);
  }


}
