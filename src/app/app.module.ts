import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostsPerUserComponent } from './pages/posts-per-user/posts-per-user.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    AddUserComponent,
    PostsComponent,
    PostsPerUserComponent,
    SettingsComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  //Used in Users Component
    FormsModule,  //used in Users Component
    ReactiveFormsModule  //AddUser Component Modal Form 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
