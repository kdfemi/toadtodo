import { Injectable } from '@angular/core';
import { TodoModel } from '../model/todo-model';
import { Task } from '../model/task';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompletionLevelRatioService {

  RatioCalculated = new Subject<number>();

  calculateRatio(todo: TodoModel): number {
    const length = todo.task.length;
    let completed = 0;

    todo.task.forEach((tk: Task) => {
      if (tk.finished) {

        completed = completed + 1;

      }
    });
    const ratio = Math.round( ( ( completed / length ) * 100) );
    return  ratio;
  }
}
