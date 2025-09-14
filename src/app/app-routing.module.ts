import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostsPerUserComponent } from './pages/posts-per-user/posts-per-user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserChartsComponent } from './pages/user-charts/user-charts.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './auth/auth/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostChartComponent } from './pages/post-chart/post-chart.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'posts-per-user', component: PostsPerUserComponent, canActivate: [AuthGuard] },
  {
    path: 'users-detail/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user-charts', component: UserChartsComponent, canActivate: [AuthGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  {
    path: 'posts-per-user/:userId',
    component: PostsPerUserComponent,
    canActivate: [AuthGuard],
  },
    { path: 'posts-charts', component: PostChartComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
