import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SiginComponent } from './user/sigin/sigin.component';
import { SigupComponent } from './user/sigup/sigup.component';
import { TodoComponent } from './todo/todo.component';
import { TodoCompletedComponent } from './todo/todo-completed/todo-completed.component';
import { TodoStartComponent } from './todo/todo-start/todo-start.component';
import { TodoPendingComponent } from './todo/todo-pending/todo-pending.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoItemComponent } from './todo/todo-list/todo-item/todo-item.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';


const routes: Routes = [
  { path:'', component:HomeComponent, children:[
    {path:'', component:SigupComponent},
    {path:'signin', component:SiginComponent},
    {path: 'signup', component:SigupComponent}
  ]},

  {path:'todo', component:TodoComponent, children:[
    {path:'', component:TodoStartComponent},
    {path:'completed', component:TodoCompletedComponent},
    {path: 'pending', component:TodoPendingComponent},
    {path:'edit', component:TodoEditComponent},
    {path:'edit/:id', component:TodoEditComponent},
    {path:'list', component:TodoListComponent},
    {path:'list/:id', component:TodoDetailComponent},
    
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
