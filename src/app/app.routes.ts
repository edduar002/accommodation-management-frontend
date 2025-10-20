import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterAdministratorComponent } from './components/register-administrator/register-administrator.component';
import { RegisterHostComponent } from './components/register-host/register-host.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registerAdmin', component: RegisterAdministratorComponent },
  { path: 'registerUser', component: RegisterUserComponent },
  { path: 'registerHost', component: RegisterHostComponent },
];