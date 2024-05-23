import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { DetailComponent } from './views/detail/detail.component';
import { SearchComponent } from './views/search/search.component';
import { PostRoomComponent } from './views/post-room/post-room.component';
import { ManagerComponent } from './views/manager/manager.component';
import { DashboardComponent } from './views/manager/dashboard/dashboard.component';
import { UserComponent } from './views/manager/user/user.component';
import { RegisterComponent } from './views/register/register.component';

const managerRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: '**', redirectTo: 'dashboard' },
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'detail',
    component: DetailComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'post-room',
    component: PostRoomComponent,
  },
  {
    path: 'profile',
    component: RegisterComponent,
  },
  {
    path: 'manager',
    component: ManagerComponent,
    children: managerRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
