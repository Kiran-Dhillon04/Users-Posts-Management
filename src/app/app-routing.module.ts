import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostsPerUserComponent } from './pages/posts-per-user/posts-per-user.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'add-user', component: AddUserComponent },
   { path: 'users/:id', component: UserDetailsComponent },
  { path: 'posts', component:PostsComponent },
  { path: 'posts-per-user', component: PostsPerUserComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo:'' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
