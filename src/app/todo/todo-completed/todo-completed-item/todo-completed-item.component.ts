import { Component, OnInit, Input } from '@angular/core';
import { TodoModel } from '../../todo-model';
import { CompletionLevelRatioService } from 'src/app/services/completion-level-ratio.service';

@Component({
  selector: 'app-todo-completed-item',
  templateUrl: './todo-completed-item.component.html',
  styleUrls: ['./todo-completed-item.component.css'],
  // providers: [CompletionLevelRatioService]
})
export class TodoCompletedItemComponent implements OnInit {

@Input() todo: TodoModel;
ratio: number;
  constructor(private calculateRatioService: CompletionLevelRatioService) {}

  ngOnInit() {
    this.ratio = this.calculateRatioService.calculateRatio(this.todo);
  }
}
