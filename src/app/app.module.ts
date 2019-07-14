import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { TodoComponent } from './todo/todo.component';
import { SiginComponent } from './user/sigin/sigin.component';
import { SigupComponent } from './user/sigup/sigup.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoOptionComponent } from './todo/todo-option/todo-option.component';
import { TodoPendingComponent } from './todo/todo-pending/todo-pending.component';
import { TodoCompletedComponent } from './todo/todo-completed/todo-completed.component';
import { TodoStartComponent } from './todo/todo-start/todo-start.component';
import { TodoItemComponent } from './todo/todo-list/todo-item/todo-item.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { TodoCompletedItemComponent } from './todo/todo-completed/todo-completed-item/todo-completed-item.component';
import { TodoPendingItemComponent } from './todo/todo-pending/todo-pending-item/todo-pending-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { SidebarToggleDirective } from './shared/sidebar-toggle.directive';
import { NotFoundPageComponent } from './error404/not-found-page/not-found-page.component';
import { SidebarTodoToggleDirective } from './shared/sidebar-todo-toggle.directive';
import { MainbarTodoToggleDirective } from './shared/mainbar-todo-toggle.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TodoComponent,
    SiginComponent,
    SigupComponent,
    TodoListComponent,
    TodoEditComponent,
    TodoOptionComponent,
    TodoPendingComponent,
    TodoCompletedComponent,
    TodoStartComponent,
    TodoItemComponent,
    TodoDetailComponent,
    TodoCompletedItemComponent,
    TodoPendingItemComponent,
    DropdownDirective,
    SidebarToggleDirective,
    NotFoundPageComponent,
    SidebarTodoToggleDirective,
    MainbarTodoToggleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
