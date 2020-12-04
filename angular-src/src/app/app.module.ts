import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service'; 
import { AuthGuardLoggedOut } from './guards/authLoggedOut.guard';
import {AuthGuardLoggedIn } from './guards/authLoggedIn.guard';


const appRoutes: Routes = [
  {path : '', component: HomeComponent},
  {path : 'register', component: RegisterComponent, canActivate: [AuthGuardLoggedIn]},
  {path : 'login', component: LoginComponent, canActivate: [AuthGuardLoggedIn]},
  {path : 'dashboard', component: DashboardComponent, canActivate: [AuthGuardLoggedOut]},
  {path : 'profile', component: ProfileComponent, canActivate: [AuthGuardLoggedOut]}

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
 
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,    
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuardLoggedOut, AuthGuardLoggedIn],
  bootstrap: [AppComponent]
})
export class AppModule { }
