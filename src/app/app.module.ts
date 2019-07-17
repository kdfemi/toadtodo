import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule} from '@angular/fire/database';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { TodoComponent } from './todo/todo.component';
import { SiginComponent } from './auth/sigin/sigin.component';
import { SigupComponent } from './auth/sigup/sigup.component';
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
import { TaskValidationDirective } from './todo/todo-edit/task-validation.directive';
import { from } from 'rxjs';

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
    MainbarTodoToggleDirective,
    TaskValidationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
