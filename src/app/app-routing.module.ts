import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {UsersComponent} from './pages/users/users.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {AwardsComponent} from './pages/awards/awards.component';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {
    path: 'order/:id',
    component: HomeComponent,
    data: {
      heading: 'Orden'
    }
  },
  {
    path: 'login',
    component: HomeComponent,
    data: {
      heading: 'Orden'
    }
  },

  {path: 'users', component: UsersComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'awards', component: AwardsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
