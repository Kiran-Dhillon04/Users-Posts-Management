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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserChartsComponent } from './pages/user-charts/user-charts.component';
import { NgChartsModule } from 'ng2-charts';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthComponent } from './auth/auth/auth.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostChartComponent } from './pages/post-chart/post-chart.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}@NgModule({
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
    UserChartsComponent,
    AuthComponent,
    PageNotFoundComponent,
    PostsComponent,
    PostChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  //Used in Users Component
    FormsModule,  //used in Users Component
    ReactiveFormsModule,  //AddUser Component Modal Form 
    NgChartsModule,   //charts component
 TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]  
      }
    })  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
