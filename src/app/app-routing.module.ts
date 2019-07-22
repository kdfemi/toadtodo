import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAuthGuard, AngularFireAuthGuardModule} from '@angular/fire/auth-guard';

import { HomeComponent } from './home/home.component';
import { SiginComponent } from './auth/sigin/sigin.component';
import { SigupComponent } from './auth/sigup/sigup.component';
import { TodoComponent } from './todo/todo.component';
import { TodoCompletedComponent } from './todo/todo-completed/todo-completed.component';
import { TodoStartComponent } from './todo/todo-start/todo-start.component';
import { TodoPendingComponent } from './todo/todo-pending/todo-pending.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoItemComponent } from './todo/todo-list/todo-item/todo-item.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { NotFoundPageComponent } from './error404/not-found-page/not-found-page.component';
import { UnauthenticateGuard } from './auth/unauthenticate.guard';
import { LoggedoutGuard } from './auth/loggedout.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    {path: '', component: SigupComponent, },
    {path: 'signin', component: SiginComponent},
    {path: 'signup', component: SigupComponent}
  ], canActivateChild: [LoggedoutGuard], canActivate: [LoggedoutGuard]},

  {path : 'todo', component: TodoComponent, children: [
    {path : '', component: TodoStartComponent},
    {path : 'completed', component: TodoCompletedComponent},
    {path : 'pending', component: TodoPendingComponent},
    {path : 'edit', component: TodoEditComponent},
    {path: 'edit/:id', component: TodoEditComponent},
    {path: 'list', component: TodoListComponent},
    {path: 'list/:id', component: TodoDetailComponent},
    {path: 'not-found', component: NotFoundPageComponent},
  ], canActivate: [UnauthenticateGuard], canActivateChild: [UnauthenticateGuard]},

  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
