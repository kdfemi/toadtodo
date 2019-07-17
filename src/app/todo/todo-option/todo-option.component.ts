import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { Observable } from 'rxjs';
import { TodoModel } from 'src/app/model/todo-model';
import { AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-todo-option',
  templateUrl: './todo-option.component.html',
  styleUrls: ['./todo-option.component.css']
})
export class TodoOptionComponent implements OnInit {

  constructor(private todoService: TodoService, private httpClient: HttpClient, private dataStorageService: DataStorageService) { }
  items: Observable<TodoModel[]>;
  itemEl: TodoModel;
  ngOnInit() {
  }
  upload() {
  // this.dataStorageService.uploadTodo();
  // .then((d => {
  //   console.log(d);
  // })).catch(
  //   err => {
  //     console.log(err);
  //   });

  }
  getAll() {

    // this.items = this.dataStorageService.getTodo().valueChanges();
  }
}
