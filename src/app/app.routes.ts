import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAdministratorComponent } from './components/login-administrator/login-administrator.component';
import { LoginHostComponent } from './components/login-host/login-host.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterAdministratorComponent } from './components/register-administrator/register-administrator.component';
import { RegisterHostComponent } from './components/register-host/register-host.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registerAdmin', component: RegisterAdministratorComponent },
  { path: 'registerUser', component: RegisterUserComponent },
  { path: 'registerHost', component: RegisterHostComponent },
  { path: 'loginHost', component: LoginHostComponent },
  { path: 'loginAdmin', component: LoginAdministratorComponent },
  { path: 'loginUser', component: LoginUserComponent },
  { path: 'myReservations', component: MyReservationsComponent },
];