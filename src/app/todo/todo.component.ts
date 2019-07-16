import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  isToggled = false;
  @ViewChild('sidebar', {static: false}) sidebar: ElementRef;
  @ViewChild('main', {static: false}) main: ElementRef;

  constructor() { }

  ngOnInit() {}

  sidebarToggleClick() {
    this.sidebar.nativeElement.classList.toggle('hidden-xs');
    this.sidebar.nativeElement.classList.toggle('col-xs-6');
    this.sidebar.nativeElement.classList.toggle('col-xs-12');
    this.isToggled = !this.isToggled;
    this.main.nativeElement.classList.toggle('hidden-xs');
  }
}
