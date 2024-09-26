import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
    { path: '', component: HomeComponent },  
    { path: 'users', component: UsersComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }  //If url doesn't exists -> redirect to home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
